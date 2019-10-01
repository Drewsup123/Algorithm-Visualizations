import React, { PureComponent } from 'react';

const DataRender = function(props){
	return(
		<div key={props.index} style={{ height : `${props.n * 10}px`, width : `${100/props.length}%`, backgroundColor : props.starting ? "purple" : props.selected ? "blue" : "red", display : "flex", justifyContent : 'center', alignItems : "center"}}>
			{`${props.n}`}
		</div>
	)
}

export default class App extends PureComponent {
    constructor(){
		super();
		this.state = {
			data : [20, 4, 1, 11, 5, 22, 60, 12, 3, 14, 15, 16, 17, 7, 8, 9, 10, 55 ],
			original : [20, 4, 1, 11, 5, 22, 60, 12, 3, 14, 15, 16, 17, 7, 8, 9, 10, 55 ],
			isSorting : false,
			changingIndex : null,
			startingIndex : null,
		}
	}


	
	bubbleSort = async () => {
		console.log("clicked")
		this.setState({ isSorting : true })
		let arr = [...this.state.data];
		for(let i = 0; i < arr.length; i++){
			await this.wait(100).then(this.setState({startingIndex : i}))
			for(let j = 0; j < arr.length; j++){
				await this.wait(200).then(() => {
					this.setState({ data : arr, changingIndex : j })
				})
				if(arr[j] > arr[j + 1]){
					var a = arr[j];
					var b = arr[j + 1];
					arr[j] = b;
					arr[j + 1] = a;
				}
			}
		}
		this.setState({ isSorting : false });
		alert("done")
	}

	randomize = e => {
		e.preventDefault();
		let array = [...this.state.data];
		var tmp, current, top = array.length;
		if(top) while(--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}
		this.setState({ data : array, original : array });
	}

	wait = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

    render() {
		return (
			<div>
				<div style={{display : "flex", justifyContent : "space-around", width : "100vw"}}>
					{
						this.state.data.map((n, index)=> 
							<DataRender starting={index === this.state.startingIndex} selected={this.state.original[this.state.changingIndex] === n} key={index} length={this.state.data.length} n={n} index={index} />
						)
					}
				</div>
				{this.state.isSorting ? "Currently Sorting" : <button onClick={() => this.bubbleSort()}>Bubble Sort</button>}
				<button onClick={this.randomize} >Randomize Array</button>
			</div>
		);
    }
}

