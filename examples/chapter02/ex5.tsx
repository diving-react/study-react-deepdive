// p. 148
// 일반 함수로 선언된 메서드에서 this 바인딩을 사용
class ClassComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
      isLimit: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }

  render() {
    const { required, text } = this.props;
    const { count } = this.state;

    return (
      <div>
        {required && <span>필수 항목입니다.</span>}
        <p>{text}</p>
        <p>count: {count}</p>
        <button onClick={this.handleClick}>증가</button>
      </div>
    );
  }
}
