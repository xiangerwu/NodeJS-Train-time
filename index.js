const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
moment.locale("zh-TW");

function get_train_time() {
	let Date = moment().format('YYYY/MM/DD');
	let Current_time = moment().format('HH:mm');
	let Arrive_time = moment().add(1, 'hour').format('HH:mm')
	var data = {
		_csrf: '8057a4aa-e7bf-463b-9046-3e2d0ea39ae4',
		//起始車站：編號-車站
		startStation: '4180-南科',
		//目的車站
		endStation: '4210-大橋',
		transfer: 'ONE',
		rideDate : Date,
		startOrEndTime: 'true',
		startTime :	Current_time,
		endTime : Arrive_time,
		trainTypeList: 'ALL',
		query: '查詢'
	}
	var options = {
		url: 'https://tip.railway.gov.tw/tra-tip-web/tip/tip001/tip112/querybytime',
		method: 'POST',
		form: data,
	}
	let train = []
	return new Promise((resolve, reject) => {
		request(options, (err, res, body) => {
			if (err) { console.log(err); }
			let $ = cheerio.load(body);
			$('tbody tr.trip-column ').each(function (i, elem) {
				train.push($(this).text().split('\n'));
			});
			if (train.length > 0) {
				train = train.map(train => ({
					type: train[7].substring(2).split("\t")[9],
					set_out: train[12].substring(2).split("\t")[5],
					arrive: train[13].substring(2).split("\t")[5]
				}))
				resolve(train);
			}
			else {
				reject("嗚....目前一個小時內都現在沒車");
			}
		})
	})
}


async function gettime(){
	const train = await get_train_time()
	return train
}

module.exports.gettime = gettime;