import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';

import { User } from '../../models/user';
import BirthdateInput from '../../components/BirthdateInput';

/**
 * 유저 생성 페이지입니다.
 * 회원가입을 위한 정보를 입력받습니다.
 * 회원가입 버튼을 누르면 백엔드 서버에 회원가입 요청을 보냅니다.
 */
export function JoinPage() {
  const [user, setUser] = useState<User>({
    id: 0,
    username: '',
    displayName: '',
    password: '',
    birthdate: new Date(),
  });
  // 페이지 이동을 위한 함수 회원가입 성공 이후 로그인 페이지
  const navigate = useNavigate();

  /**
   * 아래에서 Textfield의 값을 변경할 때 사용하는 함수입니다.
   * Textfield의 값을 변경할 때마다 함수가 실행됩니다.
   * input state를 변경하고 있습니다.
   */
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    /**
     * type이 number인 경우, event.target.value는 기본적으로 string이므로 Number() 함수를 사용해서 숫자로 변환해줍니다.
     */
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;

    setUser({
      ...user,
      [event.target.id]: value,
    });
  }
  const handleBirthdateChange = (birthdate: Date) => {
    setUser({ ...user, birthdate });
  };
  /**
   * 회원가입 버튼을 클릭하면 발생하는 함수입니다.
   * 백엔드 서버에 회원가입 요청을 보냅니다.
   * 회원가입이 완료되면 메인 페이지로 이동합니다.
   * 상태코드 201은 생성 성공을 의미합니다.
   * navigate('주소')는 해당 주소로 이동하는 함수입니다.
   * 참고로, navigate(-1)은 이전 페이지로 이동하는 함수입니다.
   */
  async function handleRegister() {
    try {
      // Join post user/join
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/join`, user, {
        headers: {
          'Content-Type': 'application/json',
        }, // 요청 header 가 json 타입
      });

      if (response.status === 201) {
        // create
        window.alert('회원가입이 완료되었습니다.');
        navigate('/login');
      }
    } catch (e) {
      window.alert('회원가입에 실패했습니다.');
    }
  }

  /**
   * TextField 컴포넌트는 HTML input 태그를 감싼 컴포넌트입니다.
   * onChange에 함수를 넣어주면, input 태그의 값이 변경될 때마다(한 글자 입력할 때마다) 함수가 실행됩니다.
   * 함수의 이름만 써야 합니다. handleInput() 이렇게 쓰면 안됩니다.
   * handleInput함수에 event 객체를 자동으로 넣어서 실행합니다.
   */
  return (
    <Box padding={2} paddingTop={4}>
      <Box marginBottom={4} textAlign={'center'}>
        <Typography variant="h4">회원가입</Typography>
      </Box>
      <Box>
        <Box marginY={2}>
          <Divider />
        </Box>
        <Stack style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
          <TextField
            sx={{ width: 406, marginTop: 10 }}
            required
            id="username"
            label="아이디"
            onChange={handleInput}
            variant="outlined"
          />
          <TextField
            sx={{ width: 406 }}
            required
            id="password"
            label="비밀번호"
            type="password"
            onChange={handleInput}
            variant="outlined"
          />
          <TextField
            sx={{ width: 406 }}
            required
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            onChange={handleInput}
            variant="outlined"
          />
          <TextField
            sx={{ width: 406 }}
            required
            id="displayName"
            label="닉네임"
            onChange={handleInput}
            variant="outlined"
          />
          <BirthdateInput onChange={handleBirthdateChange} />
        </Stack>
      </Box>
      <Box paddingY={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button sx={{ width: 406, height: 66 }} variant="contained" color="primary" onClick={handleRegister}>
          회원 가입
        </Button>
      </Box>
    </Box>
  );
}
