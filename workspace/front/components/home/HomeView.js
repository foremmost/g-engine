import { View } from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
import {Functions} from "../../libs/Functions.lib.js";
export class HomeView extends View {
    constructor(model){
        super(model);
        const _ = this;
        _.componentName = 'Home';
        _.modulePage = 'home';
        //
       // MainEventBus.add(_.componentName,'showForm',_.showForm.bind(_),`${_.componentName}View`);
   //     MainEventBus.add(_.componentName,'clearForm',_.clearForm.bind(_),`${_.componentName}View`);
    //    MainEventBus.add(_.componentName,'backToTable',_.backToTable.bind(_),`${_.componentName}View`);
    }
    async headTpl(){
        const _ = this;
        let tpl =  {
            el : '',
            childes: [
                {
                    el:''
                }
            ]
        };
        let buffer = _.createTpl(tpl);
        return buffer;
    }
    pageHeadTpl(pageData = {}){
        const _ =  this;
        _.clearBody(systemConts['content'].querySelector('.page-head'));
        return new Promise(function (resolve) {
            let tpl  = {
                el: document.createDocumentFragment(),
                childes:[
                ]
            };

            systemConts['content'].querySelector('.page-head').append(_.createTpl(tpl));
            resolve(systemConts['content'].querySelector('.page-head'));
        })
    }
    async tableTpl(){
        const _ = this;
        let tpl =  {
            el : '',
            childes: [
                {
                    el:''
                }
            ]
        };
        let buffer = _.createTpl(tpl);
        return buffer;
    }
    async tableRowTpl(){
        const _ = this;
    }
    createGraph(data,color='rgb(238, 0, 86)'){
    	const _ = this;
    	let
				graphHeight = 260,
				graphWidth = 1200,
				days = data.length,
				visits = 50,
				horStep = graphWidth/days,
				verStep = graphHeight/visits,
				dPath=`M10 ${graphHeight-(data[0]*verStep)} `,
				letter = 'C';
    		//console.log(horStep,days,graphWidth);
			_.statGraph.append(_.el("PATH",{
					d:`M10 0L10 290`,
					stroke:'#e5e5e5',
					'stroke-width':1
				}
			))
			_.statGraph.prepend(_.el("DEFS",{
				x1:"0",x2:"0" ,y1:"0" ,y2:"1",
					childes:[
						_.el('linearGradient',{
							id:'gradient',
							childes:[
								_.el('STOP',{offset:'0%','stop-color':'rgba(238, 0, 86, 0)'}),
								_.el('STOP',{offset:'50%','stop-color':'rgba(238, 0, 86, 1)'}),
								_.el('STOP',{offset:'100%','stop-color':'rgba(238, 0, 86, 0)'})
							]
						})
					]
			}))
    	for(let i=1; i <= days;i++){
    		let
					verI = graphHeight-(data[i-1]*verStep),
					firstBound = letter == 'C' ? `0 ${graphHeight-(data[0]*verStep)}` : ``,
					d = `${firstBound} ${(horStep*(i))-15} ${verI}  ${horStep*(i)} ${verI}`;
    		
    		dPath+= `${letter} ${d} `;
				letter = 'S';
    		_.statGraph.append(
					_.el("PATH",{
						d:`M${(horStep*(i))} 0L${(horStep*(i))} 290`,
						stroke:'#e5e5e5',
						'stroke-width':1
				}));
			}
			_.statGraph.append(
				_.el('G',{
					childes:[
						_.el("PATH",{
							prop:'pT',
							d: dPath,
							style:'transition:5s linear',
							'stroke-linejoin':"round",
							stroke:"url(#gradient)",
							fill:"transparent",
							'stroke-width':3
						}),
					]
				}),
				_.el('PATH',{
					d:'M0 265L1200 265',
					stroke:"#E5E5E5",
				})
			);
 /*   	setTimeout(function(){
    		_.pT.setAttribute("stroke-dashoffset",0);
    		_.pT.setAttribute("stroke-dasharray",0);
			})*/
		}
		contentTpl(){
			const _ =  this;
			return new Promise(function(resolve){
				resolve(_.el('temp',{
					childes:[
						_.el('DIV',{
							class:'page-block-row',
							childes:[
								_.el('DIV',{
									class:'page-block',
									childes:[
										_.el('H2',{
											class:'page-subtitle',
											'data-word':'Welcome'
										}),
										_.el('DIV',{
											class:'page-block-body',
											childes:[
												_.el('P',{
												
												})
											]
										})
									]
								}),
								_.el('DIV',{
									class:'page-block',
									childes:[
										_.el('H2',{
											class:'page-subtitle',
											'data-word':'Activity'
										})
									]
								}),
								_.el('DIV',{
									class:'page-block',
									childes:[
										_.el('H2',{
											class:'page-subtitle',
											'data-word':'Performance'
										})
									]
								}),
								_.el('DIV',{
									class:'page-block',
									childes:[
									
										_.el('H2',{
											class:'page-subtitle',
											'data-word':'About G-Engine'
										}),
										_.el('DIV',{
											class:'page-block-body',
											childes:[
												_.el('UL',{
													childes:[
														_.el('LI',{
															html:`<strong>Version: </strong><span> 1.0</span>`
														})
													]
												})
											]
										})
									]
								})
							]
						}),
						_.el('DIV',{
							class:'page-block-row',
							childes:[
								_.el('DIV',{
									class:'page-block large',
									childes:[
										_.el('H2',{
											class:'page-subtitle',
											'data-word':'Site statistics'
										}),
										
										_.el('DIV',{
											class:'home-stat',
											childes:[
												_.el('DIV',{
													class:'stat-left',
													childes:[
														_.el('UL',{
															class:'stat-visits-list',
															childes: [
																_.el('LI',{
																	text:50
																}),
																_.el('LI',{
																	text:40
																}),
																_.el('LI',{
																	text:30
																}),
																_.el('LI',{
																	text:20
																}),
																_.el('LI',{
																	text:10
																}),
																_.el('LI',{
																	text:0
																})
															]
														})
													]
												}),
												_.el('DIV',{
													class:'stat-right',
													childes:[
														_.el('DIV',{
															class:'stat-graph',
															childes:[
																_.el('SVG',{/*
																	width:1200,
																	height:270,*/
																	viewBox: '0 0 1200 280',
																//	style:'transform:rotateX(190deg)',
																	prop:'statGraph',
																})
															]
														}),
														_.el('DIV', {
															class:'stat-days',
															childes:[
																_.el('UL',{
																	class:'stat-days-list',
																	childes:[
																		_.el('LI',{
																			text:'1 March'
																		}),
																		_.el('LI',{
																			text:'2 March'
																		}),
																		_.el('LI',{
																			text:'3 March'
																		}),
																		_.el('LI',{
																			text:'4 March'
																		}),
																		_.el('LI',{
																			text:'5 March'
																		}),
																		_.el('LI',{
																			text:'6 March'
																		}),
																		_.el('LI',{
																			text:'7 March'
																		})
																	]
																})
															]
														})
													]
												})
											]
										}),
									]
								}),
								_.el('DIV',{
									class:'page-block user-block',
									childes:[
										_.el('H2',{
											class:'page-subtitle',
											'data-word':'Profile'
										}),
									
									]
								}),
							]
						})
					]
				}));
			});
    }
		async pageTpl(){
    	const _ = this;
    	let content = await _.getTpl('contentTpl');
    	_.contentBody.classList.add('home')
    	_.contentBody.append(content);
    	_.createGraph([1, 44,  15, 23,38,23,5],'rgba(92, 114, 232,1)');
		}
		
    async render(page) {
        const _ = this;
        return new Promise(async function (resolve) {
            if( page === _.modulePage){
                let content =  await _.pageTpl();
                resolve(systemConts['content']);
            }
        });
    }
}