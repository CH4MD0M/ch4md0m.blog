import React from 'react';
import Typewriter from 'typewriter-effect';

// CSS
import * as S from './style';

interface HeroProps {
  name: string;
}

const Hero = ({ name }: HeroProps) => {
  return (
    <S.HeroWrapper>
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
        }}
        onInit={typewriter => {
          typewriter
            .typeString('안녕하세요! <br />')
            .pauseFor(1000)
            .typeString('프론트')
            .pauseFor(1000)
            .deleteChars(3)
            .typeString('<strong>기록하는</strong> 프론트엔드 개발자 <br />')
            .typeString(`${name} 입니다.`)
            .pauseFor(2500)
            .start();
        }}
      />
    </S.HeroWrapper>
  );
};

export default Hero;
