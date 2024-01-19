import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

import CustomButton from '../CustomButton';
import Candidate from '../../models/candidate';

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

  const [isVoted, setIsVoted] = useState<boolean>(false);

  useEffect(() => {
    const savedIsVoted = localStorage.getItem(`isVoted_${pollId}`);
    if (savedIsVoted) {
      setIsVoted(JSON.parse(savedIsVoted));
    }
  }, []);

  // VoteCount를 최신화
  const userVote = async () => {
    try {
      if (isVoted) {
        toast.error('이미 투표하셨습니다.');
        return;
      }
      const votePromises = extendedCandidates.map(async (candidate) => {
        const isSelectedCandidate = props.selectedCandidates.some((selected) => selected.id === candidate.id);
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
