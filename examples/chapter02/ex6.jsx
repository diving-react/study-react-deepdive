// p.147
import { Component } from "react";

class SampleComponent2 extends Component {
    state = {
        count: 1
    }

    render() {
        const {
            state : { count }
        } = this

        return <div>{ count }</div>
    }
}