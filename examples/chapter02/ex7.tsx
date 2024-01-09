// p. 148
import React, { Component } from "react";

interface Props {
  // Props 정의
}

interface State {
  count: number;
}

class SampleComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      count: 1,
    };

    // handleClick의 this를 현재 클래스로 바인딩한다.
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    this.setState((prev) => ({
      count: prev.count + 1,
    }));
  }

  public render() {
    const {
      state: { count },
    } = this;

    return (
      <div>
        <button onClick={this.handleClick}>+</button>
        {count}
      </div>
    );
  }
}

export default SampleComponent;
