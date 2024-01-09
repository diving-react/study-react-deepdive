// p.145
import React from "react";

// 1. props 정의
interface Props {
  required?: boolean;
  text: string;
}

// 2. state 정의
interface State {
  count: number;
}

// 3. 클래스형 컴포넌트 정의: props, state
class ClassComponent extends React.Component<Props, State> {
  // 4. 클래스형 컴포넌트의 메서드 정의
  private constructor(props: Props) { // constructor에서 props를 넘겨주고, state를 기본값으로 설정
    super(props);
    this.state = {
      count: 0,
      isLimit: false,
    };
  }

  // 5. render 내부에서 사용할 메서드 정의
  private handleClick = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  // 6. render 메서드틀 통해 렌더링할 JSX 정의
    public render() {
      // props와 state값을 this, 즉 해당 클래스에서 꺼낸다.

        const = {
            props: { required, text },
            state: {count, isLimited}
        }

    return (
      <div>
        {required && <span>필수 항목입니다.</span>}
        <p>{text}</p>
        <p>count: {count}</p>
      </div>
    );
  }
}