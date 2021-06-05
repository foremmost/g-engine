import { MainEventBus } from "../../../libs/MainEventBus.lib.js";
import { gsap } from '../../../libs/GreenSock.lib.js'

export class Slider{
	constructor(params) {
		const _ = this;

		_.gsap = gsap;

		_.sliderData = params;

		_.componentName = _.sliderData['name'] ? _.sliderData['name'] : _.sliderData['container'].substring(1,_.sliderData['container'].length);

		_.init();

		MainEventBus
				.add(_.componentName,'next',_.next.bind(_),`${_.sliderData['container'].substring(1,_.sliderData['container'].length)}`)
				.add(_.componentName,'prev',_.prev.bind(_),`${_.sliderData['container'].substring(1,_.sliderData['container'].length)}`)
				.add(_.componentName,'dot',_.dot.bind(_),`${_.sliderData['container'].substring(1,_.sliderData['container'].length)}`)
	}
	// вспомогательные методы
	el(tag,params){
		const _ = this;
		if (!tag) return null;
		if (!params) params = '';
		let
				childes =  params['childes'] ?  params['childes']: null;
		delete params['childes'];
		let temp = document.createElement(tag);
		if (tag == 'temp'){
			temp = document.createDocumentFragment();
		}
		if(params){
			for(let key in params){
				if(key === 'text') {
					if( (tag === 'INPUT') || (tag === 'TEXTAREA') ) temp.value = params[key];
					else temp.textContent = params[key];
				} else if(key === 'html') temp.innerHTML = params[key];
				else temp.setAttribute(`${key}`,`${params[key]}`);
			}
		}
		if(  (childes instanceof  Array) && (childes.length) ) {
			childes.forEach(function (el) {
				temp.append(el);
			});
		}
		return temp;
	}
	undefinedCheck(setting){
		return setting !== undefined
	}
	createResolutions(){
		this.resolutions = {
			next: Infinity,
			current: null
		};
	}

	// Обрабатывает входящие данные и вызывает методы для их преобразования
	sliderInit(){
		const _ = this;

		_.settings = _.sliderData['settings'];
		_.dots = _.sliderData['dots'] ? _.sliderData['dots'] : {};
		_.arrows = _.sliderData['arrows'] ? _.sliderData['arrows'] : {};
		_.container.setAttribute('style','display:block;')
		let slidesStyles = _.acceptSettings();
		_.setGSliderHeight();
		_.slidesToDefault();
		_.calcSlidesCount(slidesStyles);
		_.calcSlidesCountForMove();

		_.acceptSlidesSettings(slidesStyles);

		_.containerToDefault();

		_.dotsToDefault();
		_.dotsContainerPrepare();

		_.arrowsContainerPrepare();
		_.arrowToDefault('prev');
		_.arrowToDefault('next');
		_.arrowsPrepare();

		_.sliderPrepare();

		if (_.padding) _.height += _.padding;
		_.gSlider.setAttribute('style',`height:${_.height}px;`)

		_.dotsPrepare();

		if (_.autoSwitch){
			_.autoSwap();
			_.gSlider.addEventListener('mouseenter',()=>{
				_.auto.pause()
			});
			_.gSlider.addEventListener('mouseleave',()=>{
				_.auto.resume()
			});
		}
	}
	autoSwap(){
		const _ = this;
		if (_.autoSwitch){
			_.auto = _.gsap.timeline({onComplete: ()=>{
					_.next();
					_.autoSwap();
				}, repeat: 1, repeatDelay: _.autoSwitchTime});
		}
	}

	// Приводит слайды к единому виду
	slidesToDefault(){
		const _ = this;

		let slides = _.container.children;
		let length = slides.length;
		_.slides = [];

		for (let i = 0; i < length; i++){
			let
					slide = slides[0],
					gSlide = _.el('DIV',{'data-pos':i,class:'g-slide',childes:[slide]});
			let img = gSlide.querySelector('img');
			if(img)
				if (img.parentElement.classList.contains('g-slide')) img.setAttribute('style','height:100%;object-fit:cover;');
			_.slides.push(gSlide)
		}
	}
	calcSlidesCount(slideStyles) {
		const _ = this;
		let currentWidth = window.innerWidth;
		let previousWidth = 0;
		for (let res in _.settings){
			if (currentWidth >= parseInt(res)) previousWidth = parseInt(res);
			else {
				currentWidth = previousWidth;
				break
			};
		}
		if (currentWidth !== previousWidth) currentWidth = previousWidth;
		let widthCheck = false;
		if (_.settings[currentWidth]['width']) widthCheck = true;
		if (_.slides['length'] < _.showCount || _.slides['length'] === 1 || (_.slides['length'] === _.showCount && !widthCheck)){
			slideStyles['flex'] = `0 0 ${100 / _.slides['length']}%`;
			slideStyles['width'] = `${100 / _.slides['length']}%`;
			_.moveCount = 1;
			_.autoSwitch = false;
			_.dots['show'] = false;
			_.arrows['show'] = false;
		} else if (_.showCount === _.slides['length']){
			let count = _.slides['length'];
			_.cloneSlides(count);
			_.calcSlidesCount(slideStyles);
		}
	}
	calcSlidesCountForMove(){
		const _ = this;
		if (_.moveCount <= 1) return;
		let remainder = _.slides.length % _.moveCount;
		let count = _.moveCount - remainder;
		_.cloneSlides(count);
	}
	cloneSlides(count){
		const _ = this;
		for (let i = 0; i < count; i++){
			let slide = _.slides[i].cloneNode(true);
			slide.setAttribute('data-pos',count + i);
			_.slides.push(slide)
		}
	}

	// Приводит доты к единому виду
	dotsContainerPrepare(){
		const _ = this;
		if (!_.dots['container']){
			_.dots['container'] = _.el('DIV',{
				class: 'g-control'
			});
			_.ownDotsContainer = true;
			_.container.append(_.dots['container']);
		} else {
			_.dots['container'] = typeof _.dots['container'] === 'string' ? document.querySelector(`${_.dots['container']}`) : _.dots['container'];
		}
		_.dotsContainerSetWidth();
	}
	dotsContainerSetWidth(){
		const _ = this;
		let width = window.innerWidth < 740 ? 11 + (20 * (_.slides.length - 1)) : 18 + (36 * (_.slides.length - 1));
		_.dots['container'].setAttribute('style',`width: ${width}px`);
	}
	dotsToDefault(){
		const _ = this;
		if (!_.dots['list']){
			_.ownDots = true;
			_.dots['list'] = _.createDots();
		} else {
			if (typeof _.dots['list'] === 'string'){
				let list = document.querySelectorAll(`${_.dots['list']}`);
				_.dots['list'] = [];
				list.forEach(function (dot,index){
					dot.setAttribute('data-click-action',`${_.componentName}:dot`);
					dot.setAttribute('data-index',`${index}`);
					_.dots['list'].push(dot);
				})
			}
		}
	}
	createDots(){
		const _ = this;
		let count = _.slides['length'] / _.moveCount;
		let dots = [];
		for (let i = 0; i < count; i++){
			let dot = _.el('BUTTON',{
				'class': _.dots['class'] ? `${_.dots['class']}` : 'g-control-button',
				'data-click-action': `${_.componentName}:dot`,
				'data-index': i * _.moveCount
			});
			dots.push(dot);
		}
		return dots;
	}
	dotsPrepare(){
		const _ = this;
		if (_.ownDots) _.dots['list'] = [];

		if (_.dots['active']){
			_.dots['active'].classList.remove('active');
			_.dots['active'] = undefined;
		}
		_.dots['container'].innerHTML = '';
		if (!_.dots['show']) return;
		if (_.ownDots) _.dots['list'] = _.createDots();
		_.dots['list'].forEach(function (dot){
			_.dots['container'].append(dot);
		});
		if (_.ownDotsContainer){
			let width = 34 * _.dots['list'].length;
			_.dots['container'].setAttribute('style',`width:${width}px`);
		}

		let currentPos = _.gSlider.firstElementChild.getAttribute('data-pos');
		_.dots['active'] = _.dots['container'].querySelector(`[data-index='${currentPos}']`);
		_.dots['active'].classList.add('active');
	}


	// Приводит стрелки к единому виду
	arrowToDefault(direction){
		const _ = this;
		if (!_.arrows[direction]){
			_.arrows[direction] = _.createArrow(direction);
		} else {
			_.arrows[direction] = document.querySelector(`${_.arrows[direction]}`);
		}
		_.arrows[direction].setAttribute('data-click-action',`${_.componentName}:${direction}`);
	}
	createArrow(direction){
		const _ = this;
		let arrow = _.el('BUTTON',{
			'class': _.arrows['class'] ? `${_.arrows['class']}` : 'g-arrows-button'
		});
		arrow.innerHTML = `
			<svg viewBox="0 0 50 46" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M3 23H47M47 23L26.75 3M47 23L26.75 43" stroke="#222222" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>`
		direction === 'next' ? arrow.classList.add('g-arrows-next') : arrow.classList.add('g-arrows-prev');
		return arrow;
	}
	arrowsPrepare(){
		const _ = this;
		_.arrows['container'].prepend(_.arrows['prev']);
		_.arrows['container'].append(_.arrows['next']);
		if (!_.arrows['show']) {
			_.arrows['next'].setAttribute('style','display:none;');
			_.arrows['prev'].setAttribute('style','display:none;');
		} else {
			_.arrows['next'].removeAttribute('style');
			_.arrows['prev'].removeAttribute('style');
		}
	}
	arrowsContainerPrepare(){
		const _ = this;
		_.arrows['container'] = _.arrows['container'] ? document.querySelector(`${_.arrows['container']}`) : _.container;
	}

	// Приводит контейнер к единому виду
	containerToDefault(){
		const _ = this;
		_.gSlider = _.el('DIV',{class: 'g-slider'});
		_.container.setAttribute('style',`position:relative; display:block;`)
		_.container.prepend(_.gSlider);
	}

	// Применяет переданные настройки
	acceptSettings(){
		const _ = this;
		_.acceptDefaultSettings();

		let slideStyles = {};
		_.createResolutions();

		return _.settingsHandler(slideStyles);
	}
	acceptDefaultSettings(){
		const _ = this;
		_.showCount = 1;
		_.moveCount = 1;
		_.animTime = 0.3;
		_.animation = 'scroll';
		_.dots['show'] = false;
		_.arrows['show'] = false;
		_.autoSwitchTime = 10;
		_.autoSwitch = false;
	}
	settingsHandler(styles){
		const _ = this;
		for (let resolution in _.settings){
			let settings = _.settings[resolution];
			if (typeof resolution !== "number") resolution = parseInt(resolution);
			if (window.innerWidth >= resolution) {
				_.resolutions['current'] = resolution;
				styles = _.collectSlidesSettings(styles,settings);
				_.acceptBasicSettings(settings);
			} else {
				_.resolutions['next'] = resolution;
				break;
			}
		}
		return styles;
	}
	collectSlidesSettings(styles,settings){
		const _ = this;
		if (_.undefinedCheck(settings['padding'])){
			styles['padding'] = settings['padding'];
			let height = settings['padding'];
			let padding = height.split(' ');
			if (padding.length > 2) padding = [padding[0],padding[2]];
			else padding = [padding[0]];

			height = 0;
			for (let pad of padding){
				height += parseInt(pad.substr(0,pad.length - 2));
			}
			_.padding = height;
		}

		if (_.undefinedCheck(settings['width'])) {
			styles['width'] = `${settings['width']}px`;
			styles['flex'] = `0 0 ${settings['width']}px`;
		} else if (_.undefinedCheck(settings['count'])) {
			styles['width'] = `${100 / settings['count']}%`;
			styles['flex'] = `0 0 ${100 / settings['count']}%`;
		} else {
			styles['width'] = '100%';
			styles['flex'] = '0 0 100%';
		}
		styles['height'] = '100%';
		return styles;
	}
	acceptBasicSettings(settings){
		const _ = this;
		if (_.undefinedCheck(settings['width'])) _.showCount = Math.ceil(_.container.clientWidth / settings['width']);
		else if (_.undefinedCheck(settings['count'])) _.showCount = parseInt(settings['count'])

		_.animTime = _.undefinedCheck(settings['animationTime']) ? settings['animationTime'] : _.animTime;
		_.moveCount = _.undefinedCheck(settings['moveCount']) ? settings['moveCount'] : _.moveCount;
		_.animation = _.undefinedCheck(settings['animation']) ? settings['animation'] : _.animation;
		_.dots['show'] = _.undefinedCheck(settings['dots']) ? settings['dots'] : _.dots['show'];
		_.arrows['show'] = _.undefinedCheck(settings['arrows']) ? settings['arrows'] : _.arrows['show'];
		_.autoSwitch = _.undefinedCheck(settings['autoSwitch']) ? settings['autoSwitch'] : _.autoSwitch;
		_.autoSwitchTime = _.undefinedCheck(settings['autoSwitchTime']) ? parseInt(settings['autoSwitchTime']) : _.autoSwitchTime;
	}

	acceptSlidesSettings(styles){
		let stylesString = this.slidesSettingsToString(styles);
		this.setSettingsToSlides(stylesString);
	}
	slidesSettingsToString(styles){
		let stylesString = '';
		for (let style in styles){
			let subStr = style + ':' + styles[style] + ';';
			stylesString += subStr;
		}
		if (!stylesString) stylesString = `width:100%`;
		return stylesString;
	}
	setSettingsToSlides(stylesString){
		const _ = this;
		for (let i = 0; i < _.slides.length; i++){
			let slide = _.slides[i];
			slide.setAttribute('style',stylesString);
		}
	}

	sliderPrepare(){
		const _ = this;
		_.gSlider.innerHTML = '';
		_.currentPosNext = 0;
		_.currentPosPrev = _.showCount - 1;
		let count = _.showCount < _.slides['length'] ? _.showCount : _.slides['length'];
		for(let i = 0; i < count; i++){
			let slide = _.slides[i];
			_.gSlider.append(slide);
			_.gsap.set(slide,{x:slide.clientWidth * i});
		}
	}
	setGSliderHeight(){
		const _ = this;
		_.height = 0;
		let container = _.gSlider ? _.gSlider : _.container;
		for (let i = 0; i < container.children.length; i++){
			let slide = container.children[i];
			slide.removeAttribute('style');
			if (slide.clientHeight > _.height){
				_.height = slide.clientHeight;
			}
		}
	}

	dot(clickData){
		const _ = this;
		if (_.slides['length'] <= _.showCount) return;
		let btn = clickData['item'];
		let index = parseInt(btn.getAttribute('data-index'));
		let moveCount;
		moveCount = index - _.currentPosNext;

		if (moveCount > (_.slides.length / 2)){
			moveCount = moveCount - _.slides.length;
		} else if (moveCount < -(_.slides.length / 2)){
			moveCount = moveCount + _.slides.length;
		}

		if (moveCount === 0) return;
		if (moveCount < 0){
			moveCount *= -1;
			_.moveToPrev(moveCount,moveCount)
		} else _.moveToNext(moveCount,moveCount)
	}

	prev(){
		const _ = this;
		if (_.slides['length'] <= _.showCount) return;
		_.moveToPrev();
	}
	next(){
		const _ = this;
		if (_.slides['length'] <= _.showCount) return;
		_.moveToNext();
	}
	moveToNext(count,partTime){
		const _ = this;
		if (!count) count = this.moveCount;
		if (!partTime) partTime = this.moveCount;
		if (_.swipeAccess){
			_.swipeAccess = false;

			let
					len = _.slides.length,
					currentSlide = _.gSlider.querySelector(`[data-pos='${_.currentPosNext}']`),
					nextPos = _.currentPosNext + _.showCount;

			if (nextPos >= len) nextPos = nextPos - len;

			let nextSlide = _.slides[nextPos];
			_.gSlider.append(nextSlide);
			_.gsap.set(nextSlide,{x:(_.gSlider.children.length - 1) * nextSlide.clientWidth})

			_.currentPosNext++;
			_.currentPosPrev++;
			if (_.currentPosNext >= len) _.currentPosNext = 0;
			if (_.currentPosPrev >= len) _.currentPosPrev = 0;

			_.slideAnimation({currentSlide,count,direction: 'next',partTime})
		}
	}
	moveToPrev(count,partTime){
		const _ = this;
		if (!count) count = this.moveCount;
		if (!partTime) partTime = this.moveCount;
		if (_.swipeAccess){
			_.swipeAccess = false;

			let
					len = _.slides.length,
					currentSlide = _.gSlider.querySelector(`[data-pos='${_.currentPosPrev}']`),
					nextPos = _.currentPosPrev - _.showCount;

			if (nextPos < 0) nextPos = nextPos + len;

			let nextSlide = _.slides[nextPos];
			_.gSlider.prepend(nextSlide);
			_.gsap.set(nextSlide,{x:-nextSlide.clientWidth})

			_.currentPosPrev--;
			_.currentPosNext--;
			if (_.currentPosPrev < 0) _.currentPosPrev = len - 1;
			if (_.currentPosNext < 0) _.currentPosNext = len - 1;

			_.slideAnimation({currentSlide,count,direction: 'prev',partTime})
		}
	}
	slideAnimation(animationData){
		const _ = this;
		if (_.animation === 'opacity'){
			_.gsap.set(_.gSlider.children,{
				x:(pos,slide)=>{
					return animationData['direction'] === 'next' ? (pos - 1) * slide.clientWidth : pos * slide.clientWidth
				},
				onComplete:()=>{
					animationData['currentSlide'].remove();
					_.swipeAccess = true;
					let count = animationData['count'] - 1;
					if (count >= 1) {
						animationData['direction'] === 'next'
								? _.moveToNext(count,animationData['partTime']) : _.moveToPrev(count,animationData['partTime'])
					} else {
						if (_.dots['show']){
							_.dotsActiveInactive();
						}
					}
				}
			});
		} else {
			_.gsap.to(_.gSlider.children,{
				x:(pos,slide)=>{
					return animationData['direction'] === 'next' ? (pos - 1) * slide.clientWidth : pos * slide.clientWidth
				},
				duration: _.animTime / animationData['partTime'],
				ease: 'none',
				onComplete:()=>{
					animationData['currentSlide'].remove();
					_.swipeAccess = true;
					let count = animationData['count'] - 1;
					if (count >= 1) {
						animationData['direction'] === 'next'
								? _.moveToNext(count,animationData['partTime']) : _.moveToPrev(count,animationData['partTime'])
					} else {
						if (_.dots['show']){
							_.dotsActiveInactive();
						}
					}
				}
			})
		}
	}
	dotsActiveInactive(){
		const _ = this;
		_.dots['active'].classList.remove('active');
		_.dots['active'] = _.dots['container'].querySelector(`[data-index='${_.currentPosNext}']`);
		_.dots['active'].classList.add('active')
	}

	reInit(){
		const _ = this;
		let slidesStyles = _.acceptSettings();
		_.acceptSlidesSettings(slidesStyles);
		_.calcSlidesCount(slidesStyles);
		_.calcSlidesCountForMove();
		_.sliderPrepare();
		_.setGSliderHeight();
		_.dotsToDefault();
		_.dotsContainerSetWidth();
		_.dotsPrepare();
		_.arrowsPrepare();
	}
	init(){
		const _ = this;
		_.container = document.querySelector(`${_.sliderData['container']}`);
		if (!_.container || !_.container.children.length){
			let arrows = _.sliderData.arrows;
			if (arrows){
				if (arrows.container){
					document.querySelector(arrows.container).setAttribute('style','display:none');
				} else {
					document.querySelector(arrows.next).setAttribute('style','display:none');
					document.querySelector(arrows.prev).setAttribute('style','display:none');
				}
			}
			let dots = _.sliderData.dots;
			if (dots){
				if (dots.container){
					if (typeof dots.container === 'string')	document.querySelector(arrows.container).setAttribute('style','display:none');
					else dots.container.setAttribute('style','display:none');
				}
			}
			return;
		}
		_.swipeAccess = true;
		_.sliderInit();
		window.addEventListener('resize',function (){
			if (window.innerWidth >= _.resolutions['next'] || window.innerWidth < _.resolutions['current'])	{
				_.reInit();
			}
		})
	}
}