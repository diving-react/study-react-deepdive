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
  constructor(props: Props) { // constructor에서 props를 넘겨주고, state를 기본값으로 설정
    super(props);
    this.state = {
      count: 0,
    };
  }

  // 5. render 내부에서 사용할 메서드 정의
  handleClick = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  // 6. render 메서드를 통해 렌더링할 JSX 정의
  render() {
    const { required, text } = this.props;
    const { count } = this.state;

    return (
      <div>
        {required && <span>필수 항목입니다.</span>}
        <p>{text}</p>
        <p>count: {count}</p>
        <button onClick={this.handleClick}>Increase Count</button>
      </div>
    );
  }
}

export default ClassComponent;