class Rhythm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	timer: null,
	    	gapTime: 0,
	    	clientX: 0
	    };
	 }
	moveAnimation() {
		let oUl = this.refs.container,
			oLi = oUl.children,
			oImg = oUl.querySelectorAll("img"),
			length = oImg.length,
			radius = oUl.offsetWidth / 8 * 6,
			aTime = Date.now();
		for(let i = 0; i < length; i++) {
			let rect = oImg[i].getBoundingClientRect(),
				middle = rect.left + rect.width / 2,
				distance = Math.abs(middle - this.state.clientX);

			if(distance > radius) distance = radius;

			let scale = distance / radius,
				tranY = scale * 60,
				toTop = rect.top - oLi[i].getBoundingClientRect().top,
				n = toTop / rect.height * 100,
				t = (tranY - n) / 4;
				n += t;
			oImg[i].style.transform = "translate3d(0," + n + "%,0)";
		}
		console.log(11);
		if(aTime - this.state.gapTime < 500) {
			this.setState({
				clientX: this.state.clientX
			})
		}
	}
	handleMouseMove(ev) {
		//window.cancelAnimationFrame(this.state.timer);
		//let timer = window.requestAnimationFrame( this.moveAnimation.bind(this, ev) );
		this.setState({
			gapTime: Date.now(),
			clientX: ev.clientX
		});
	}
	componentWillUpdate() {
		requestAnimationFrame( this.moveAnimation.bind(this) );
	}
	componentDidUpdate() {
	}
	render() {
		let lis = this.props.images.map((str, i) => {
			return (
				<li key={i}>
					<img src={str} />
				</li>
			);
		});
		return (
			<div className="rhythm">
				<ul ref="container" onMouseMove={this.handleMouseMove.bind(this)}>
					{lis}
				</ul>
			</div>
		);
	}
};
ReactDOM.render(
	<Rhythm images={ [
		"dist/img1/1.png",
		"dist/img1/2.png",
		"dist/img1/3.png",
		"dist/img1/4.png",
		"dist/img1/5.png",
		"dist/img1/6.png",
		"dist/img1/7.png",
		"dist/img1/7.png"
	] }/>,
	document.getElementById("example")
);
