import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

import CustomButton from '../CustomButton';
import Candidate from '../../models/candidate';

// Candidate에 color, voteCount 속성 추가
interface ExtendedCandidate extends Candidate {
  color: string;
  voteCount: number;
}

// 후보마다 흰 색을 제외한 랜덤한 색상 부여
async function getRandomColor(): Promise<string> {
  let randomColor: string;

  // 임계값 이상의 값이면 검정색으로 설정
  const threshold: number = 30;

  do {
    randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const r: number = parseInt(randomColor.slice(1, 3), 16);
    const g: number = parseInt(randomColor.slice(3, 5), 16);
    const b: number = parseInt(randomColor.slice(5, 7), 16);

    if (r > 255 - threshold && g > 255 - threshold && b > 255 - threshold) {
      randomColor = '#000000';
    }
  } while (!randomColor || randomColor.length !== 7);

  return randomColor;
}

// 선택한 candidate의 현재 투표 수 불러오는 함수
const getVoteCount = async (candidateId: number) => {
  const VoteCountResponse = await axios.get(`${process.env.REACT_APP_API_URL}/poll/1/${candidateId}`);
  const voteCount: number = VoteCountResponse.data;
  return voteCount;
};

export default function voteBar(props: { candidates: Candidate[]; selectedCandidates: Candidate[] }) {
  const [extendedCandidates, setExtendedCandidates] = useState<ExtendedCandidate[]>([]);
  const { pollId } = useParams();
  useEffect(() => {
    const initializeCandidates = async () => {
      // props로 받아온 모든 후보에 대해 color와 초기 voteCount 설정
      const newExtendedCandidates: ExtendedCandidate[] = await Promise.all(
        props.candidates.map(async (candidate) => ({
          ...candidate,
          color: await getRandomColor(),
          voteCount: await getVoteCount(candidate.id),
        })),
      );

      setExtendedCandidates(newExtendedCandidates);
    };

    initializeCandidates();
  }, [props.candidates]);

  // 이미 투표했는지 여부 확인하는 state
  const [isVoted, setIsVoted] = useState<boolean>(false);

  useEffect(() => {
    const savedIsVoted = localStorage.getItem(`isVoted_${pollId}`);
    if (savedIsVoted) {
      setIsVoted(JSON.parse(savedIsVoted));
    }
  }, []);

  // 현재 extendedCandidates들 중 props로 받은 selectedCandidates내에 있는 (즉 내가 선택한) candidate에 대해서 vote table을 생성하고
  // VoteCount를 최신화하기
  const userVote = async () => {
    try {
      if (isVoted) {
        toast.error('이미 투표하셨습니다.');
        return;
      }
      const votePromises = extendedCandidates.map(async (candidate) => {
        // selectedCandidates 배열에 현재 후보(candidate)의 id가 포함되어 있는지 확인
        const isSelectedCandidate = props.selectedCandidates.some((selected) => selected.id === candidate.id);
        // isSelectedCandidate가 true인 경우에만 투표 수행
        if (isSelectedCandidate) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/poll/${Number(pollId)}`,
            {
              votedCandidate: candidate.id,
            },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          if (!response) throw new Error('응답이 없습니다.');

          return { candidate, voteCount: await getVoteCount(candidate.id) };
        }

        // isSelectedCandidate가 false인 경우에는 현재 후보 정보만 반환
        return { candidate, voteCount: candidate.voteCount };
      });

      const updatedCandidates = await Promise.all(votePromises);

      setExtendedCandidates((prevCandidates) =>
        prevCandidates.map((c) => {
          const matchingUpdate = updatedCandidates.find((updated) => updated.candidate.id === c.id);
          return matchingUpdate ? { ...c, voteCount: matchingUpdate.voteCount } : c;
        }),
      );
      localStorage.setItem(`isVoted_${pollId}`, JSON.stringify(true));
      setIsVoted(true);
    } catch (error) {
      toast.error('투표 요청에 실패했습니다.');
    }
  };

  // VoteCount가 달라진 경우 extendedCandidates에 새로 추가
  const updateVoteCount = async () => {
    try {
      const updatedCandidates = await Promise.all(
        extendedCandidates.map(async (candidate) => {
          const currentVoteCount = candidate.voteCount;
          const newVoteCount = await getVoteCount(candidate.id);
          return { candidate, currentVoteCount, newVoteCount };
        }),
      );
      setExtendedCandidates((prevCandidates) =>
        prevCandidates.map((c) => {
          const matchingUpdate = updatedCandidates.find((updated) => updated.candidate.id === c.id);
          return matchingUpdate && matchingUpdate.currentVoteCount !== matchingUpdate.newVoteCount
            ? { ...c, voteCount: matchingUpdate.newVoteCount }
            : c;
        }),
      );
    } catch (error) {
      window.alert('투표 정보를 가져오는데 실패했습니다.');
    }
  };
  // 1초마다 extendedCandidates 변화를 감지해서 투표 바 자동으로 변경해주기
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await updateVoteCount();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [extendedCandidates]);

  return (
    <div>
      <Box height="550px" maxHeight="550px" overflow="auto" paddingRight="10px">
        {extendedCandidates.map((candidate) => (
          <div key={candidate.restaurant.restaurantName}>
            <Typography fontWeight="bold" variant="subtitle1" paddingLeft={2} paddingTop={2}>
              {candidate.restaurant.restaurantName}: {candidate.voteCount}표
            </Typography>
            <div
              style={{
                width: `${candidate.voteCount * 40}px`,
                height: '50px',
                backgroundColor: candidate.color,
                transition: 'width 0.3s ease',
                marginTop: '10px',
                marginRight: '30px',
                marginLeft: '15px',
                borderRadius: '10px',
              }}
            ></div>
          </div>
        ))}
      </Box>
      <Box marginTop={2} display="flex" justifyContent="flex-end">
        <CustomButton width="150px" text="투표하기" onClick={() => userVote()} />
      </Box>
    </div>
  );
}
