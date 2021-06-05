import {View} from "../main/View.js";
import {MainEventBus} from "../../libs/MainEventBus.lib.js";
import {systemConts} from "../../libs/Conts.lib.js";
import {Functions} from "../../libs/Functions.lib.js";

export class ConsultantView extends View {
	constructor(model) {
		super(model);
		const _ = this;
		_.componentName = 'consultant';
		_.modulePage = 'consultant';
		_.content = systemConts['content'];
		_.newChatsCheck = true;
		_.statuses = ['Unanswered', 'Answered', 'Answering', 'All'];
	}

	async pageTpl() {
		const _ = this;
		Functions.showLoader(_._content);

		_.clearContent();
		_.pageHeadTpl({page: 'mainPage'});
		let tableTpl = await _.getTpl('tableTpl');
		_.contentBody.append(tableTpl);
		await _.fillTable();

		Functions.hideLoader(_._content);
	}

	pageHeadTpl(pageData) {
		const _ = this;
		_.ghead = !_.ghead ? _.el('H1', {'data-word': 'Consultant', 'class': 'page-title'}) : _.ghead;
		let inner;

		if (pageData.page === 'mainPage') {
			inner = _.el('temp',{childes: [
				_.ghead,
				_.getTpl('filterTpl', {save: true}),
				_.pageActionTpl(pageData.page)
			]});
			_.model.currentStatus = inner.querySelector('.status-filter select').value;
		} else if (pageData.page === 'answerPage') {
			inner = _.el('temp',{childes: [
				_.ghead,
				_.pageActionTpl(pageData.page)
			]})
		}
		_.contentHead.append(inner);
	}
	filterTpl() {
		const _ = this;
		let filterTpl = _.el('DIV', {
			'class': 'page-filter status-filter',
			childes: [
				_.el('DIV', {
					'class': 'page-inpt', 'childes': [
						_.el('SPAN', {'data-word': 'Status'}),
						_.el('SELECT', {
							'data-change-action': `${_.componentName}:filterChats`, 'childes': [
								_.el('OPTION', {'data-word': 'Unanswered', 'value': _.model.UNANSWERED}),
								_.el('OPTION', {'data-word': 'Answered', 'value': _.model.ANSWERED}),
								_.el('OPTION', {'data-word': 'Answering', 'value': _.model.ANSWERING}),
								_.el('OPTION', {'data-word': 'All', 'value': _.model.ALL})
							]
						})
					]
				})
			]
		});
		return filterTpl;
	}
	pageActionTpl(page) {
		const _ = this;
		let pageActionTpl = _.el('DIV', {'class': 'page-action'});
		if (page === 'answerPage'){
			let
				backBtn = _.el('BUTTON', {
					'data-word': `Back`,
					'class': `btn cons-back`,
					'data-click-action': `${_.componentName}:finishChat`
				}),
				finishBtn = _.el('BUTTON', {
					'data-word': `Finish chat`,
					'class': `btn cons-finish`,
					'data-click-action': `${_.componentName}:finishChat`
				})
			pageActionTpl.append(backBtn);
			if (_.model.currentChat['action'] === 'answer') pageActionTpl.append(finishBtn);
		} else {
			let btn = _.el('BUTTON',{
				'class' : 'btn my-chats-btn',
				'data-click-action' : `${_.componentName}:openYourChats`
			});
			if (_.model.myChats) btn.setAttribute('data-word','All Chats');
			else btn.setAttribute('data-word','My Chats');
			pageActionTpl.append(btn);
		}
		return pageActionTpl;
	}
	tableTpl(body) {
		const _ = this;
		return _.el('TABLE', {
			'prop':'table',
			'class': 'page-table consultant-table', 'childes': [
				_.el('THEAD', {
					'childes': [
						_.el('TR', {
							'childes': [
								_.el('TH', {'data-word': 'Date'}),
								_.el('TH', {'data-word': 'Time'}),
								_.el('TH', {'class': 'consultant-thead-status'}),
								_.el('TH', {'data-word': 'Respondent'}),
								_.el('TH', {'data-word': 'Name'}),
								_.el('TH', {'data-word': 'Email'}),
								_.el('TH', {'data-word': 'Message'}),
								_.el('TH', {'text': '#', 'class': 'digit'})
							]
						})
					]
				}),
				_.el('TBODY')
			]
		});
	}
	async fillTable(pageData = {}) {
		const _ = this;
		_.pageData = pageData;
		let tbody = _.table.querySelector('tbody');
		_.clearCont(tbody);

		if (!_.pageData.page) _.pageData.page = 1

		_.model.isCommon(status) ?_.pageData['type'] = 'main' : _.pageData['type'] = 'search';

		_.pageData['items'] = await _.getChats(_.pageData);

		if (typeof _.pageData['items'] === 'string' || !_.pageData['items'].length) return;

		_.pageData['searchMethod'] = 'getChatsByStatus';
		_.pageData['template'] = 'fillTable';

		_.tableHeadRebuild();

		console.log(_.pageData);
		setInterval(async function (){
			if (_.newChatsCheck) await _.refreshChats();
		},5000)
		//return;

		await _.tableRowsTpl(_.pageData,true);
	}

	async getChats(pageData){
		const _ = this;
		let items;
		if (_.model.isCommon(_.model.currentStatus)) items = await _.model.getChats(pageData)
		else {
			_.pageData['status'] = _.model.currentStatus;
			items = await _.model.getChatsByStatus(pageData);
		}
		return items;
	}
	async refreshChats(){
		const _ = this;
		_.newChatsCheck = false;
		Functions.showLoader(_._content);

		let chats = await _.getChats(_.pageData);
		console.log(chats);

		Functions.hideLoader(_._content);
		_.newChatsCheck = true;
	}

	async addNewChats(chats){
		const _ = this;
		let temp = _.el('temp');
		for (let i = 0; i < chats.length; i++){
			let row = await _.tableRowTpl(chats[i]);
			temp.append(row)
		}
		_.contentBody.querySelector('.consultant-table tbody').prepend(temp)
	}

	async tableRowTpl(chat) {
		const _ = this;
		let lastMessage = await _.model.getLastMessage(chat['dialogId']);
		let date = lastMessage['addDate'] ? lastMessage['addDate'].split(' ') : [];

		let respondent = chat['answerUid'] !== 0 ? await _.model.getUserData(chat['answerUid']) : {name: 'None'};
		let status = _.model.isCommon(_.model.currentStatus) ? _.statuses[chat['status']] : '';
		let secondName = chat.user['second_name'] ? chat.user['second_name'] : '';

		let rowTpl = _.el('TR', {
			'childes': [
				_.el('TD', {'class': 'consultant-table-date', 'childes': [_.el('DIV', {'text': date[0]})]}),
				_.el('TD', {'class': 'consultant-table-time', 'childes': [_.el('DIV', {'text': date[1]})]}),
				_.el('TD', {
					'class': 'consultant-table-status',
					'childes': [_.el('DIV', {'class': 'consultant-tbody-status', text: status})]
				}),
				_.el('TD', {
					'class': 'consultant-table-respondent',
					'childes': [_.el('DIV', {'class': 'consultant-tbody-respondent', 'text': respondent['name']})]
				}),
				_.el('TD', {
					'class': 'consultant-table-name',
					'childes': [_.el('DIV', {'text': `${chat.user['name']} ${secondName}`})]
				}),
				_.el('TD', {'class': 'consultant-table-email', 'childes': [_.el('DIV', {'text': chat.user['email']})]}),
				_.el('TD', {'class': 'consultant-table-text', 'childes': [_.el('DIV', {text: lastMessage['message']})]}),
				_.el('TD', {'class': 'consultant-table-actions', 'childes': [_.el('DIV')]})
			]
		});
		let buttonData = {
			'class': 'btn consultant-table-btn',
			'data-click-action': `${_.componentName}:answerPage`,
			'data-dialogId': `${chat['dialogId']}`,
			'data-action': 'view',
			'data-word': 'VIew',
		};
		let viewBtn = _.el('BUTTON', buttonData);
		buttonData['data-action'] = 'answer';
		buttonData['data-word'] = 'Answer';
		let ansBtn = _.el('BUTTON', buttonData);
		rowTpl.lastElementChild.firstElementChild.append(viewBtn, ansBtn);
		return rowTpl;
	}

	tableHeadRebuild() {
		const _ = this;
		let statusTh = _.contentBody.querySelector('.consultant-thead-status');
		if (statusTh){
			if (!_.model.isCommon(_.model.currentStatus)) {
				statusTh.removeAttribute('data-word');
				statusTh.removeAttribute('data-lang');
				statusTh.textContent = '';
				statusTh.style = 'padding:0;margin:0;'
			} else {
				statusTh.setAttribute('data-word', 'Status');
				statusTh.removeAttribute('style');
			}
		}
	}

	async answerPage() {
		const _ = this;
		_.clearContent();

		_.pageHeadTpl({page: 'answerPage'});
		let body = _.answerPageBodyTpl();

		_.infoBlockTpl(body);
		_.chatTpl(body);

		_.chatMessageTpl();
		await MainEventBus.trigger(_.componentName, 'chatFill');
		MainEventBus.trigger('languager', 'loadTranslate');
	}

	answerPageBodyTpl() {
		const _ = this;
		/*let body = _.el('DIV', {'class': 'page-body answer-page'});
		_.content.append(body);
		return body;*/
	}

	infoBlockTpl(body) {
		const _ = this;
		let infoTpl = _.el('UL', {'class': 'consultant-info-cont'});
		for (let param in _.model.currentChat.user) {
			let item = _.el('LI', {
				'class': 'consultant-info-item', 'childes': [
					_.el('SPAN', {'data-word': param}),
					_.el('SPAN', {'text': `: ${_.model.currentChat.user[param]}`})
				]
			});
			infoTpl.append(item)
		}
		let statusSelect = _.el('LI', {
			'class': 'consultant-info-item', 'childes': [
				_.el('DIV', {
					'class': 'page-inpt', 'childes': [
						_.el('SPAN', {'data-word': 'Status'}),
						_.el('SELECT', {
							'data-change-action': `${_.componentName}:messageChangeStatus`, 'childes': [
								_.el('OPTION', {'data-word': 'Answered', 'value': _.model.ANSWERED}),
								_.el('OPTION', {'data-word': 'Unanswered', 'value': _.model.UNANSWERED})
							]
						})
					]
				})
			]
		});
		if (_.model.currentChat['action'] === 'answer') infoTpl.append(statusSelect);
		_.contentBody.append(infoTpl);
	}

	chatTpl() {
		const _ = this;
		let chat = _.el('DIV', {
			'class': 'consultant-chat', 'childes': [
				_.el('FORM', {
					'class': 'consultant-chat-form', 'data-submit-action': `${_.componentName}:formSubmit`, 'childes': [
						_.el('TEXTAREA', {
							'class': 'consultant-chat-input',
							'data-word': 'Write your answer here',
							'data-keyUp-action': `${_.componentName}:formKeyUp`
						}),
						_.el('BUTTON', {'class': 'consultant-chat-confirm btn', 'data-word': 'Send'})
					]
				})
			]
		});
		if (_.model.currentChat['action'] === 'view') chat.querySelector('form').remove();
		_.chatWindow = _.el('DIV', {'class': 'consultant-chat-cont'});
		chat.prepend(_.chatWindow);
		_.chatWindow.addEventListener('scroll', function (e) {
			MainEventBus.trigger(_.componentName, 'chatScrollToTop', e)
		});
		_.contentBody.append(chat);
	}

	chatMessageTpl() {
		const _ = this;
		let messageTpl = _.el('DIV', {
			'class': 'consultant-chat-message-row', 'childes': [
				_.el('DIV', {
					'class': 'consultant-chat-message', 'childes': [
						_.el('SPAN', {'class': 'consultant-chat-name'}),
						_.el('DIV', {'class': 'consultant-chat-text'}),
						_.el('SPAN', {
							'class': 'consultant-chat-info', 'childes': [
								_.el('SPAN', {'class': 'consultant-chat-time'})
							]
						})
					]
				})
			]
		});
		_.messageTpl = messageTpl;
	}

	dateRow(date) {
		const _ = this;
		date = date.split('-');
		date = date[2] + '-' + date[1] + '-' + date[0];
		let dateTpl = _.el('DIV', {
			'class': 'consultant-chat-dateRow',
			'text': date
		});
		return dateTpl;
	}

	async chatFill(dialog) {
		const _ = this;
		let
			temp = _.el('temp'),
			prevUser = null,
			prevTpl = null,
			prevDate = null;

		for (let i = 0; i < dialog.length; i++) {
			let
				messData = dialog[i],
				date = messData['addDate'].split(' ')[0],
				nextMesDate = dialog[i + 1] ? dialog[i + 1]['addDate'].split(' ')[0] : null;

			let curUser = await _.model.getUserData(messData['uId'],messData.source);
			let mesTpl = await _.chatMessage(messData,curUser);
			_.model.firstMesId = messData.id;

			if (prevUser && curUser['id'] === prevUser['id'] && prevDate === date){
				prevTpl.querySelector('.consultant-chat-name').remove()
			}

			prevDate = date;
			prevUser = curUser;
			prevTpl = mesTpl;

			temp.prepend(mesTpl);
			if (date !== nextMesDate){
				temp.prepend(_.dateRow(date));
			}
		}
		_.chatWindow.prepend(temp);
	}

	async chatMessage(messageData, curUser) {
		const _ = this;
		return new Promise(async function (resolve) {
			let
					tpl = _.messageTpl.cloneNode(true),
					nameTpl = tpl.querySelector('.consultant-chat-name');

			tpl.setAttribute('data-id', messageData['id']);
			tpl.setAttribute('data-uId',curUser['id']);
			tpl.setAttribute('data-source',messageData['source']);

			if (curUser['id'] !== _.model.currentUser['id']) {
				nameTpl.textContent = curUser['name'];
				if (curUser['id'] !== _.model.currentChat['uId']) {
					tpl.firstElementChild.classList.add('consultant-chat-another')
				}
			} else if (curUser['id'] === _.model.currentUser['id']) {
				nameTpl.setAttribute('data-word', 'You');
				tpl.firstElementChild.classList.add('consultant-chat-you');
			}

			if (messageData['status'] === 0 && curUser['id'] !== _.model.currentUser['id']) {
				tpl.classList.add('consultant-chat-message-unread');

				if (_.model.currentChat["action"] !== 'view') {
					let updateData = {
						'type': 'message',
						'id': messageData['id'],
						'status': 1
					};
					MainEventBus.trigger(_.componentName, 'changeStatus', updateData);
					setTimeout(function () {
						tpl.classList.remove('consultant-chat-message-unread')
					}, 3000);
				}
			}

			let dateInfo = messageData['addDate'].split(' ');
			let timeInfo = dateInfo[1].split(':');
			timeInfo = timeInfo[0] + ':' + timeInfo[1];
			tpl.querySelector('.consultant-chat-time').textContent = timeInfo;
			tpl.querySelector('.consultant-chat-text').textContent = messageData.message;
			resolve(tpl)
		})
	}

	async addNewMessages(messages) {
		const _ = this;
		let
				temp = _.el('temp'),
				prevUser = null,
				dateRows = _.chatWindow.querySelectorAll('.consultant-chat-dateRow'),
				prevDateArray = dateRows[dateRows.length - 1].textContent.split('-'),
				prevDate = prevDateArray[2] + '-' + prevDateArray[1] + '-' + prevDateArray[0];

		for (let i = 0; i < messages.length; i++) {
			let
				mesData = messages[i],
				curUser = await _.model.getUserData(mesData['uId'],mesData['source']),
				date = mesData['addDate'].split(' ')[0];

			if (i === 0){
				let
						lastElem = _.chatWindow.lastElementChild,
						prevUserId = parseInt(lastElem.getAttribute('data-uId')),
						prevUserSource = lastElem.getAttribute('data-source');
				prevUser = await _.model.getUserData(prevUserId,prevUserSource);
			}

			let mesTpl = await _.chatMessage(mesData, curUser);

			if (prevDate !== date) temp.append(_.dateRow(date));
			else {
				if(prevUser['id'] === curUser['id']) mesTpl.querySelector('.consultant-chat-name').remove();
			}

			prevUser = curUser;
			prevDate = date;
			temp.append(mesTpl);
		}
		_.chatWindow.append(temp);
	}

	chatScrollToLast() {
		const _ = this;
		if (_.chatWindow.children.length) _.chatWindow.scrollTo(0, _.chatWindow.lastElementChild.offsetTop);
	}

	async render(page) {
		const _ = this;
		return new Promise(async function (resolve) {
			if (page === _.modulePage) {
				_.model.currentUser = await _.model.getUserData();
				await _.pageTpl();
				resolve(systemConts['content']);
				await MainEventBus.trigger(_.componentName, 'newChatsCheck', page)
			}
		});
	}
}