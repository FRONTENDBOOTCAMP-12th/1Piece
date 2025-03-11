import S from './FindPw.module.css';
import CheckEmail from './CheckEmail';
import NewPw from './NewPw';
import { useState } from 'react';

function FindPwForm() {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [newPw, setNewPw] = useState('');
  const [step, setStep] = useState(1);
  return (
    <div className={S.container}>
      {step === 1 ? (
        <CheckEmail
          id={id}
          email={email}
          setId={setId}
          setEmail={setEmail}
          setStep={setStep}
        />
      ) : (
        <NewPw
          email={email}
          newPw={newPw}
          setNewPw={setNewPw}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default FindPwForm;
