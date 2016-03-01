class Rhythm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	clientX: 0,
	    	scale: false,
	    	offsetY: [],
	    	offsetX: [],
	    	ulStyle: {}
	    };
	 }
	moveAnimation() {
		let {
			oUl,
			oLis,
			oImgs,
			length,
			radius
		} = this.params;

		//let {offsetY} = this.state;
		let offsetY = [];
		for(let i = 0; i < length; i++) {
			let oImg = oImgs[i],
				rect = oImg.getBoundingClientRect(),
				middle = rect.left + rect.width / 2,
				distance = Math.abs(middle - this.state.clientX);

			if(distance > radius) distance = radius;

			let scale = distance / radius,
				tranY = scale * 80,
				toTop = rect.top - oLis[i].getBoundingClientRect().top,
				n = toTop / rect.height * 100,
				t = (tranY - n) / 4;
				n += t;

			offsetY.push({
				WebkitTransform: `translate3d(0, ${n}%,0)`,
				transition: 'none'
			});
			// oImg.style.webkitTransform = "translate3d(0," + n + "%,0)";
			// oImg.style.transition = "none";
		}
		this.setState({ offsetY });
		console.log(11);
		if(Date.now() - this.state.gapTime < 500) {
			let timer = requestAnimationFrame( this.moveAnimation.bind(this) )
			this.params.timer = timer;
		}
	}
	handleMouseMove(ev) {
		cancelAnimationFrame(this.params.timer);
		let timer = requestAnimationFrame( this.moveAnimation.bind(this) );
		this.setState({
			clientX: ev.clientX
		});
		this.params.timer = timer;
		this.params.gapTime = Date.now();
	}
	handleMouseOut(ev) {

	}
	componentDidMount() {
		let oUl = this.refs.container,
			oLis = oUl.children,
			oImgs = oUl.querySelectorAll("img"),
			length = oImgs.length,
			radius = oUl.offsetWidth / 8 * 6,
			gapTime = Date.now();

		//存储常用的变量
		this.params = {
			oUl,
			oLis,
			length,
			radius,
			oImgs,
			gapTime
		};
	}
	componentWillUpdate() {

	}
	componentDidUpdate() {

	}
	handleClick(ev) {
		let {scale} = this.state,
			forEach = Array.prototype.forEach;


		let oUl = this.refs.container,
			oLi = ev.target.parentNode;

		let ulStyle = {},
			offsetY = [];

		if(scale) {
			// oUl.remove('style');

			// forEach.call(
			// 	this.params.oLis,
			// 	li => {
			// 		li.children[0].remove('style');
			// 	}
			// );
		}else {
			let ulMiddle = oUl.offsetWidth / 2,
				liMiddle = oLi.offsetLeft + oLi.offsetWidth / 2;

			ulStyle = {
				WebkitTransform: `scale(3) translate3d(${ulMiddle - liMiddle}px, 0, 0)`
			};

			// oUl.style.webkitTransform = `scale(3) translate3d(${ulMiddle - liMiddle}px, 0, 0)`;

			forEach.call(
				this.params.oLis,
				li => {
					let offset = '47%';
					if(li === oLi) {
						offset = '27%';
					}
					// li.children[0].style.webkitTransform = `translate3d(0, ${offset}, 0)`;
					offsetY.push({
						WebkitTransform: `translate3d(0, ${offset}, 0)`
					});
				}
			);

		}

		this.setState({
			scale: !scale,
			ulStyle,
			offsetY
		});
	}
	renderLis() {
		let {offsetY, offsetX} = this.state;

		return this.props.images.map((str, i) => {
			let style = offsetY[i];
			return (
				<li key={i}>
					<img src={str} style={style} />
				</li>
			);
		});
	}
	render() {
		let {scale, ulStyle} = this.state;
		return (
			<div className="rhythm">
				<ul ref="container"
					style={ulStyle}
					onClick={this.handleClick.bind(this)}
					onMouseMove={scale ? null : this.handleMouseMove.bind(this)}
					onMouseOut={scale ? null : this.handleMouseOut.bind(this)}>
					{this.renderLis()}
				</ul>
			</div>
		);
	}
};
ReactDOM.render(
	<Rhythm images={ [
		"dist/img/1.png",
		"dist/img/2.png",
		"dist/img/3.png",
		"dist/img/4.png",
		"dist/img/5.png",
		"dist/img/6.png",
		"dist/img/7.png",
		"dist/img/7.png"
	] }/>,
	document.getElementById("example")
);
