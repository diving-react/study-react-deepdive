// 리액트 내에서 유효하지 않거나 사용되는 경우가 거이 없는 문법도 JSX문법 자체로 유효하다

function Child(){
    retrun <A.B.C.D>내용</A.B.C.D>;
}

function Child2(){
    retrun <$>내용</$>;
}

function Child3(){
    retrun <_>내용</_>
}