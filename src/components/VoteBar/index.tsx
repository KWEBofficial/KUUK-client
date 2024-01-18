import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

import CustomButton from '../CustomButton';
import Candidate from '../../models/candidate';

// Candidate에 color, voteCount 속성 추가
interface ExtendedCandidate extends Candidate {
  color: string;
  voteCount: number;
}

// 후보마다 흰 색을 제외한 랜덤한 색상 부여
function getRandomColor() {
  let color;
  do {
    color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } while (isWhiteish(color));
  return color;
}
// 랜덤 생성한 색이 흰 색인지 판별
function isWhiteish(color: string) {
  return color.toUpperCase() === '#FFFFFF';
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
          color: getRandomColor(),
          voteCount: await getVoteCount(candidate.id),
        })),
      );

      setExtendedCandidates(newExtendedCandidates);
    };

    initializeCandidates();
  }, [props.candidates]);

  // 현재 extendedCandidates들 중 props로 받은 selectedCandidates내에 있는 (즉 내가 선택한) candidate에 대해서 vote table을 생성하고
  // VoteCount를 최신화하기
  const userVote = async () => {
    try {
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
    } catch (error) {
      window.alert('투표 요청에 실패했습니다.');
    }
  };

  return (
    <div>
      {extendedCandidates.map((candidate) => (
        <div key={candidate.restaurant.restaurantName}>
          <Typography variant="subtitle1">
            {candidate.restaurant.restaurantName}: {candidate.voteCount}표
          </Typography>
          <div
            style={{
              width: `${candidate.voteCount * 10}px`,
              height: '20px',
              backgroundColor: candidate.color,
              transition: 'width 0.3s ease',
              marginRight: '10px',
            }}
          ></div>
        </div>
      ))}
      <CustomButton text="투표하기" onClick={() => userVote()} />
    </div>
  );
}
