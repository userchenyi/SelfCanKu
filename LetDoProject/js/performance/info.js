$(function() {
	setAllSystemUsers();
	//	getLabeledOrg();
});

function getLabeledOrg() {
	$.ajax({
		type: "post",
		url: loginIp + "getLabeledOrg",
		data: {
			"businessUnitId": "41C131F1-3D39-E711-80B9-549F350F546D"
		},
		async: false,
		success: function(data) {
			var _LabeledOrg = data.resultList;
			for(var i = 0; i < _LabeledOrg.length; i++) {
				var _array = _LabeledOrg[i].businessUnitLabel.split(".");
				_LabeledOrg[i].businessUnitLabelId = _array.join('');
				var len = _LabeledOrg[i].businessUnitLabelId.length;
				var _parentId = _LabeledOrg[i].businessUnitLabelId.substring(0, len - 1);
				if(_parentId == "") {
					_LabeledOrg[i].businessUnitLabelParentId = 0;
					_LabeledOrg[i].parent_id = 0;
				} else {
					_LabeledOrg[i].businessUnitLabelParentId = parseInt(_LabeledOrg[i].businessUnitLabelId.substring(0, len - 1));
					_LabeledOrg[i].parent_id = _LabeledOrg[i].businessUnitLabelParentId;
				}
				_LabeledOrg[i].businessUnitLabelId = parseInt(_array.join(''));
				_LabeledOrg[i].id = _LabeledOrg[i].businessUnitLabelId;
			}
			sessionStorage.setItem("LabeledOrg", JSON.stringify(_LabeledOrg));
		},
		error: function() {
			return false;
		}
	});
}
//设置所有用户信息
function setAllSystemUsers() {
	var _accountManagers = [{
		"name": "夏丹丹",
		"id": "342201198904204481"
	}, {
		"name": "庄会清",
		"id": "222403198004053821"
	}, {
		"name": "陈艳",
		"id": "420822198405293320"
	}, {
		"name": "郭云武",
		"id": "330103197912020438"
	}, {
		"name": "林卫华",
		"id": "330329197509153542"
	}, {
		"name": "周永挺",
		"id": "330105197707090616"
	}, {
		"name": "刘立权",
		"id": "430602198310222533"
	}, {
		"name": "汪静容",
		"id": "522122198407284820"
	}, {
		"name": "李微阳",
		"id": "430626199005206719"
	}, {
		"name": "李现珍",
		"id": "370831198402103642"
	}, {
		"name": "唐正敏",
		"id": "431229198302132617"
	}, {
		"name": "王一涵",
		"id": "320104198108050424"
	}, {
		"name": "韩菁",
		"id": "330105198701180025"
	}, {
		"name": "刘伟一",
		"id": "370682198911116918"
	}, {
		"name": "傅学磊",
		"id": "330102198609121218"
	}, {
		"name": "赵毅",
		"id": "410825199305137592"
	}, {
		"name": "王芳",
		"id": "362524199007020526"
	}, {
		"name": "朱少晖",
		"id": "341024197309052610"
	}, {
		"name": "张欢",
		"id": "420682198702203518"
	}, {
		"name": "钱庆丰",
		"id": "330781198603305014"
	}, {
		"name": "刘海保",
		"id": "360730198407054110"
	}, {
		"name": "王芬",
		"id": "43042119890624810X"
	}, {
		"name": "张改萍",
		"id": "420382198602093569"
	}, {
		"name": "沈洁",
		"id": "430503198308272524"
	}, {
		"name": "程华源",
		"id": "362334198802060751"
	}, {
		"name": "黄敬",
		"id": "330122199403053539"
	}, {
		"name": "胡亮",
		"id": "362330199108258994"
	}, {
		"name": "洪梦菲",
		"id": "341021199206304387"
	}, {
		"name": "陈锋",
		"id": "362323199202122117"
	}, {
		"name": "陆芳芳",
		"id": "339005198901193026"
	}, {
		"name": "陈思燕",
		"id": "330104199008042722"
	}, {
		"name": "赵得乾",
		"id": "372523198209135736"
	}, {
		"name": "石晓霞",
		"id": "330103198308181627"
	}, {
		"name": "张海东",
		"id": "339005199012114919"
	}, {
		"name": "李彩华",
		"id": "232602196501180829"
	}, {
		"name": "胡涛",
		"id": "330104199004153011"
	}, {
		"name": "冯能",
		"id": "330104199001033030"
	}, {
		"name": "何一峰",
		"id": "339005198912263413"
	}, {
		"name": "占涛涛",
		"id": "362323198707025924"
	}, {
		"name": "吴晓丽",
		"id": "362330197809013069"
	}, {
		"name": "张一青",
		"id": "610582198608012053"
	}, {
		"name": "韩佩霞",
		"id": "450802198411209228"
	}, {
		"name": "范忆敏",
		"id": "330419197307165628"
	}, {
		"name": "展疆",
		"id": "412726198409153317"
	}, {
		"name": "刘晓艳",
		"id": "612428198712060627"
	}, {
		"name": "谢飞君",
		"id": "330206199112132048"
	}, {
		"name": "江晓州",
		"id": "342531199010151711"
	}, {
		"name": "平达",
		"id": "33010219840517211x"
	}, {
		"name": "赵超斌",
		"id": "430502199209085510"
	}, {
		"name": "陈增宝",
		"id": "331023198710013171"
	}, {
		"name": "黄俊峰",
		"id": "330683198912065314"
	}, {
		"name": "杨晓平",
		"id": "43080219820504043x"
	}, {
		"name": "张静",
		"id": "362229198509083229"
	}, {
		"name": "杨军",
		"id": "330127199012292753"
	}, {
		"name": "程涛",
		"id": "421127198901033717"
	}, {
		"name": "李海",
		"id": "34122119870601389x"
	}, {
		"name": "杨培",
		"id": "42098219801213235x"
	}, {
		"name": "陈校良",
		"id": "330106198110130831"
	}, {
		"name": "周品岳",
		"id": "330303198811100311"
	}, {
		"name": "盛福钱",
		"id": "330781199502235015"
	}, {
		"name": "杨爽",
		"id": "230502198603100553"
	}, {
		"name": "汪先红",
		"id": "340827199402142312"
	}, {
		"name": "朱宝仙",
		"id": "330104197102063344"
	}, {
		"name": "杨林雅",
		"id": "422127197903080046"
	}, {
		"name": "闫利侠",
		"id": "341623198703282685"
	}, {
		"name": "沈萍",
		"id": "341227198104036144"
	}, {
		"name": "陈庆",
		"id": "341227198211223172"
	}, {
		"name": "沈文辉",
		"id": "341623198706126012"
	}, {
		"name": "陈书佳",
		"id": "330326197602251818"
	}, {
		"name": "章昊天",
		"id": "339005199407020079"
	}, {
		"name": "刘中琦",
		"id": "421003198610163240"
	}, {
		"name": "陈国华",
		"id": "340221198404054951"
	}, {
		"name": "潘楚冰",
		"id": "33108219930523002x"
	}, {
		"name": "王雅奇",
		"id": "622201197808301233"
	}, {
		"name": "何有才",
		"id": "45240219870421213x"
	}, {
		"name": "李培雨",
		"id": "342224198609151756"
	}, {
		"name": "应超",
		"id": "330681199007010315"
	}, {
		"name": "邱传远",
		"id": "362321198705037515"
	}, {
		"name": "钟战红",
		"id": "342923197212263116"
	}, {
		"name": "刘涛",
		"id": "330523198405105017"
	}, {
		"name": "陆耀明",
		"id": "330102198406272112"
	}, {
		"name": "陈沐乔",
		"id": "310110198603100527"
	}, {
		"name": "金以群",
		"id": "310106195907010418"
	}, {
		"name": "花丽华",
		"id": "320684198704010022"
	}, {
		"name": "杨晓旭",
		"id": "220104198706170326"
	}, {
		"name": "毛赤宇",
		"id": "320602197009150526"
	}, {
		"name": "周通顺",
		"id": "320611196103270315"
	}, {
		"name": "施林冲",
		"id": "320626196912103634"
	}, {
		"name": "戴树珍",
		"id": "652201196507170226"
	}, {
		"name": "徐一丹",
		"id": "320611198801151814"
	}, {
		"name": "何伟",
		"id": "320683198912317153"
	}, {
		"name": "王金鹏",
		"id": "320683198912037215"
	}, {
		"name": "张鹤钟",
		"id": "320683199212177553"
	}, {
		"name": "龚丽萍",
		"id": "330725197606020027"
	}, {
		"name": "吕玲",
		"id": "360681198409073221"
	}, {
		"name": "季孝章",
		"id": "330725196205170214"
	}, {
		"name": "严赟",
		"id": "330211198509191018"
	}, {
		"name": "张华",
		"id": "330211198601150040"
	}, {
		"name": "闻亚君",
		"id": "330227199109287518"
	}, {
		"name": "张开柱",
		"id": "330226198807285279"
	}, {
		"name": "张智霖",
		"id": "330206198401141712"
	}, {
		"name": "邹瑜",
		"id": "330206199007191425"
	}, {
		"name": "马影霞",
		"id": "341221199301291562"
	}, {
		"name": "姜磊",
		"id": "330921198602220013"
	}, {
		"name": "黄金凤",
		"id": "320381198601015247"
	}, {
		"name": "张无瑕",
		"id": "330203197310151524"
	}, {
		"name": "应孜",
		"id": "33020319901019242X"
	}, {
		"name": "陈旭",
		"id": "360105199411300519"
	}, {
		"name": "王秀琦",
		"id": "362401198206272043"
	}, {
		"name": "张志超",
		"id": "220821198704284535"
	}, {
		"name": "李江疆",
		"id": "360102199003234330"
	}, {
		"name": "鲁蔚华",
		"id": "360103198803064116"
	}, {
		"name": "卢强",
		"id": "362204199209223311"
	}, {
		"name": "周佩君",
		"id": "360103199303192749"
	}, {
		"name": "王青",
		"id": "360103198905133426"
	}, {
		"name": "毛云敏",
		"id": "362323198911105446"
	}, {
		"name": "黄了",
		"id": "360102198701260048"
	}, {
		"name": "王雪芬",
		"id": "370503198202040921"
	}, {
		"name": "杨柳",
		"id": "370502198110207222"
	}, {
		"name": "贾振莲",
		"id": "37052119850906164X"
	}, {
		"name": "徐长静",
		"id": "370523198612202423"
	}, {
		"name": "孙红滨",
		"id": "370523198712042420"
	}, {
		"name": "李玲玲",
		"id": "370502198309082025"
	}, {
		"name": "侯明静",
		"id": "370125198906242325"
	}, {
		"name": "项超",
		"id": "370502198804140819"
	}, {
		"name": "岳全明",
		"id": "370522198702281878"
	}, {
		"name": "张恒川",
		"id": "370502199603276415"
	}, {
		"name": "李宁宁",
		"id": "371481198906200967"
	}, {
		"name": "张露伟",
		"id": "370502199103135616"
	}, {
		"name": "李彪",
		"id": "37040198405180052 "
	}, {
		"name": "常正欣",
		"id": "370282198503065814"
	}, {
		"name": "李瑶瑶",
		"id": "370502199010076426"
	}, {
		"name": "魏贝贝",
		"id": "370522198605200028"
	}, {
		"name": "姜向真",
		"id": "4110811921116036X "
	}, {
		"name": "江小勇",
		"id": "360121197901291476"
	}, {
		"name": "冯珊珊",
		"id": "331081198709260021"
	}, {
		"name": "樊志永",
		"id": "360121198407083932"
	}, {
		"name": "张颖",
		"id": "230231198505263522"
	}, {
		"name": "阮文怡",
		"id": "330283198611302724"
	}, {
		"name": "何灵龙",
		"id": "330204198205100013"
	}, {
		"name": "李文超",
		"id": "34070219850524105X"
	}, {
		"name": "范洪云",
		"id": "320826198808183849"
	}, {
		"name": "刘捷",
		"id": "31022719781007004X"
	}, {
		"name": "陈英",
		"id": "330182198111073724"
	}, {
		"name": "刘红兵",
		"id": "342501197608127217"
	}, {
		"name": "张振梅",
		"id": "37030519811020592X"
	}, {
		"name": "徐晓静",
		"id": "330211197301071522"
	}, {
		"name": "贝妮娜",
		"id": "330204198504122028"
	}, {
		"name": "张淼",
		"id": "622825198211080122"
	}, {
		"name": "周小敏",
		"id": "340826198908261430"
	}, {
		"name": "牟威威",
		"id": "330382199603088312"
	}, {
		"name": "高丽媛",
		"id": "370502198904113228"
	}, {
		"name": "张慧明",
		"id": "370521199201042826"
	}, {
		"name": "施兰兰",
		"id": "41142319870811352X"
	}, {
		"name": "余国宝",
		"id": "360428197512015831"
	}, {
		"name": "林发超",
		"id": "331022198802041894"
	}, {
		"name": "陈仁友",
		"id": "360121199004273517"
	}, {
		"name": "包志娴",
		"id": "320624197609017567"
	}, {
		"name": "王晓瑜",
		"id": "310107199101193424"
	}, {
		"name": "邱燕",
		"id": "310102198806301644"
	}, {
		"name": "纵风前",
		"id": "342222198511206074"
	}, {
		"name": "王阳",
		"id": "342623199003180317"
	}, {
		"name": "湛明明",
		"id": "211021199008216440"
	}, {
		"name": "王燕",
		"id": "342623199203140328"
	}, {
		"name": "刘亮亮",
		"id": "421023198403051233"
	}, {
		"name": "唐利民",
		"id": "330725196611150016"
	}, {
		"name": "杨真",
		"id": "142723198701043532"
	}, {
		"name": "庞颂",
		"id": "210402198007304112"
	}, {
		"name": "周梦琪",
		"id": "330782198705220624"
	}, {
		"name": "余文龙",
		"id": "340826199210243411"
	}, {
		"name": "赵雨",
		"id": "140211199104273321"
	}, {
		"name": "蒋连国",
		"id": "342222198607078011"
	}, {
		"name": "徐冬梅",
		"id": "360281198306182140"
	}, {
		"name": "熊艳青",
		"id": "360103197710181220"
	}, {
		"name": "金旭丹",
		"id": "330725198312305128"
	}, {
		"name": "靳莉",
		"id": "340223198105229021"
	}, {
		"name": "邵率",
		"id": "371312199007086714"
	}, {
		"name": "吕楠",
		"id": "341281199306056066"
	}, {
		"name": "嵇吴斌",
		"id": "330204198903046018"
	}, {
		"name": "杨军",
		"id": "522723198312291613"
	}, {
		"name": "苏文斌",
		"id": "310102199109052835"
	}, {
		"name": "潘虹",
		"id": "652801198702155525"
	}, {
		"name": "钱燕",
		"id": "321284198809290066"
	}, {
		"name": "李斌",
		"id": "330204198705226018"
	}, {
		"name": "王士峰",
		"id": "330205198705243332"
	}, {
		"name": "华康",
		"id": "330782198505020214"
	}, {
		"name": "鹿于库",
		"id": "372926198808292515"
	}, {
		"name": "张禕杰",
		"id": "31011019881022053X"
	}, {
		"name": "陈质斌",
		"id": "331023199411064627"
	}, {
		"name": "傅朱林",
		"id": "330725198010115134"
	}, {
		"name": "顾俊伟",
		"id": "310106198611191639"
	}, {
		"name": "郑斌",
		"id": "310107198706290011"
	}, {
		"name": "潘虹1",
		"id": "330205198702242721"
	}, {
		"name": "练达雄",
		"id": "332523197806221817"
	}, {
		"name": "刘婷婷",
		"id": "320723198906092049"
	}, {
		"name": "唐斯雨",
		"id": "34082619920917341X"
	}, {
		"name": "乔建安",
		"id": "310225198003031273"
	}, {
		"name": "郑鑫立",
		"id": "330205198404240314"
	}, {
		"name": "王冬梅",
		"id": "320602198001305321"
	}, {
		"name": "刘滔",
		"id": "340825199209014359"
	}, {
		"name": "梅外生",
		"id": "362204198507206910"
	}, {
		"name": "陈洋",
		"id": "34082219911221331X"
	}, {
		"name": "章威",
		"id": "360423198709242918"
	}, {
		"name": "罗贾",
		"id": "432524198504286118"
	}, {
		"name": "周佳",
		"id": "330501198301290029"
	}, {
		"name": "史海燕",
		"id": "340823199108060249"
	}, {
		"name": "卢夏星",
		"id": "330623198206120017"
	}, {
		"name": "翁翊",
		"id": "330106198209131519"
	}, {
		"name": "袁里",
		"id": "511025198210181124"
	}, {
		"name": "高婧莹",
		"id": "310110198906203240"
	}, {
		"name": "曹玉婷",
		"id": "330205199201121221"
	}, {
		"name": "丁旭明",
		"id": "330227198107156472"
	}, {
		"name": "孙佳贤",
		"id": "330283199203155811"
	}, {
		"name": "蔡挺辉",
		"id": "330227198312244412"
	}, {
		"name": "梁东",
		"id": "622226198501151017"
	}, {
		"name": "徐光迅",
		"id": "340222198107164421"
	}, {
		"name": "苏丽娟",
		"id": "452331198311023326"
	}, {
		"name": "张越禹",
		"id": "310103199001174079"
	}, {
		"name": "周亚",
		"id": "370828198603151028"
	}, {
		"name": "苏玉成",
		"id": "360222198403064218"
	}, {
		"name": "徐华",
		"id": "320621198111268110"
	}, {
		"name": "闵玉田",
		"id": "342623198409247935"
	}, {
		"name": "郭秋娥",
		"id": "452223198507064028"
	}, {
		"name": "戴寅珏",
		"id": "31010919860302352x"
	}, {
		"name": "向胜男",
		"id": "513721199303027061"
	}, {
		"name": "谷红留",
		"id": "320803197909164218"
	}, {
		"name": "陈开周",
		"id": "612401198704282772"
	}, {
		"name": "杨影",
		"id": "341223198210190027"
	}, {
		"name": "梅阳华",
		"id": "310108198702222616"
	}, {
		"name": "焦伟",
		"id": "230505198808240217"
	}, {
		"name": "周新凯",
		"id": "362528198408130014"
	}, {
		"name": "王涛",
		"id": "342623199211178131"
	}, {
		"name": "何淼",
		"id": "310105197910302844"
	}, {
		"name": "赵金龙",
		"id": "230604198203224715"
	}, {
		"name": "张春哲",
		"id": "370724197410247116"
	}, {
		"name": "王晓晔",
		"id": "370102197403234922"
	}, {
		"name": "王长中",
		"id": "411526198808072918"
	}, {
		"name": "嵇金鑫",
		"id": "321102199209101510"
	}, {
		"name": "万芳",
		"id": "420583198409111041"
	}, {
		"name": "曹成鹏",
		"id": "342531199011202218"
	}, {
		"name": "陆洁",
		"id": "320583198507289421"
	}, {
		"name": "赵念申",
		"id": "310106197903082413"
	}, {
		"name": "郭小江",
		"id": "421102198709050552"
	}, {
		"name": "王希品",
		"id": "372926198812137710"
	}, {
		"name": "王梓",
		"id": "411302199206196035"
	}, {
		"name": "任倩",
		"id": "320882198601232026"
	}, {
		"name": "张世仙",
		"id": "532329198809081927"
	}, {
		"name": "盛红燕",
		"id": "320621197806260743"
	}, {
		"name": "时峰",
		"id": "342225197510083193"
	}];
	$.ajax({
		type: "post",
		url: "https://cfcrm.yhxchina.com/crm-rest-service/getAllSystemUsers",
		data: {
			"certNo": "123",
			"systemName": "李江疆" //王松钢
		},
		async: false,
		success: function(data) {
			if(data.statusCode == 0) {
				var allAccountManager = data.resultList;
				for(var i = 0; i < _accountManagers.length; i++) {
					for(var j = 0; j < allAccountManager.length; j++) {
						if(allAccountManager[j].systemUserName == _accountManagers[i].name) {
							allAccountManager[j].certNo = _accountManagers[i].id;
							break;
						}
					}
				}
				sessionStorage.setItem("AllSystemUsers", JSON.stringify(allAccountManager));
			}
		},
		error: function(err) {
			return false;
		}
	});
}
//获取全公司理财师身份证列表
var _certNos = {},
	certNos = [],
	departIds = [],
	parentsdepartIds = [],
	departNames = [];

function getAllCertNos() {
	var allAccountManager = JSON.parse(sessionStorage.getItem("AllSystemUsers"));
	for(var i = 0; i < allAccountManager.length; i++) {
		certNos.push(allAccountManager[i].certNo);
		departIds.push(allAccountManager[i].businessUnitId);
		parentsdepartIds.push(allAccountManager[i].parentBusinessUnitId);
		departNames.push(allAccountManager[i].businessUnitName);
	}
	_certNos = {
		certNos: certNos,
		departIds: departIds,
		parentsdepartIds: parentsdepartIds,
		departNames: departNames
	}
	return _certNos;
}
//整体业绩
function dataTeam(data) {
	var _block = data;
	//certNo->对应的部门
	var branches = [];
	var companies = [];
	var allACertNos = getAllCertNos(); //获取全公司理财师身份证列表
	var _sum = 0;
	console.log("业绩", _block);
	console.log(allACertNos);
	for(var i = 0; i < _block.length; i++) {
		var _agent = _block[i];
		var _index = $.inArray(_agent.id, allACertNos.certNos);
		if(-1 != _index) {
			var amount = 0;
			for(var j = 0; j < _agent.data.length; j++) {
				amount += Number(_agent.data[j].Amount / 10000);
			}
			_agent.amount = amount;
			_sum += Number(amount);
			var businessUnitId = allACertNos.departIds[_index];
			var parentBusinessUnitId = allACertNos.parentsdepartIds[_index];
			var businessUnitName = allACertNos.departNames[_index];
			var key = companies.indexOf(businessUnitId);
			if(-1 != key) {
				branches[key].list.push(_agent);
			} else {
				var _company = {
					amount: 0,
					businessUnitName: businessUnitName,
					businessUnitId: businessUnitId,
					parentBusinessUnitId: parentBusinessUnitId,
					percent: 0,
					list: []
				};
				_company.list.push(_agent);
				branches.push(_company);
				companies.push(businessUnitId);
			}
		}
	}
	for(var i = 0; i < branches.length; i++) {
		for(j = 0; j < branches[i].list.length; j++) {
			branches[i].amount += Number(branches[i].list[j].amount);
		}
		branches[i].percent = ((Number((branches[i].amount / _sum) * 10000)) / 100).toFixed(2); //四舍五入保留两位小数
	}
	return branches;
}
//匹配理财师对应的部门
function listTeam(data) {
	var _block = data;//业绩数据
	console.log("理财师业绩",_block);
	var department_list = [];//设置分公司包含部门unitId
	var arr1 = [];//上海私行
	arr1.push(LabeledOrg[18].businessUnitId);
	var arr2 = [];//杭州一分
	arr2.push(LabeledOrg[24].businessUnitId);
	var arr3 = [];//杭州二分
	arr3.push(LabeledOrg[23].businessUnitId);
	var arr4 = [];//宁波一分
	arr4.push(LabeledOrg[15].businessUnitId);
	var arr5 = [];//义乌一分
	arr5.push(LabeledOrg[21].businessUnitId);
	var arr6 = [];//南通一分
	arr6.push(LabeledOrg[14].businessUnitId);
	var arr7 = [];//南昌
	arr7.push(LabeledOrg[12].businessUnitId);
	var arr8 = [];//东营
	arr8.push(LabeledOrg[37].businessUnitId);
	for(var i = 0; i < LabeledOrg.length; i++) {
		if(LabeledOrg[18].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr1.push(LabeledOrg[i].businessUnitId);
		};
		if(LabeledOrg[24].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr2.push(LabeledOrg[i].businessUnitId);
		};
		if(LabeledOrg[23].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr3.push(LabeledOrg[i].businessUnitId);
		};
		if(LabeledOrg[15].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr4.push(LabeledOrg[i].businessUnitId);
		};
		if(LabeledOrg[21].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr5.push(LabeledOrg[i].businessUnitId);
		};
		if(LabeledOrg[14].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr6.push(LabeledOrg[i].businessUnitId);
		};
		if(LabeledOrg[12].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr7.push(LabeledOrg[i].businessUnitId);
		};
		if(LabeledOrg[37].businessUnitId == LabeledOrg[i].parentBusinessUnitId) {
			arr8.push(LabeledOrg[i].businessUnitId);
		};
	}
	var departArr = [{
		"businessUnitId":LabeledOrg[18].businessUnitId,//分公司
		"businessUnitName": LabeledOrg[18].businessUnitName,
		"businessUnitIdArr":arr1,//分公司子部门unitId集合
		"certNoArr":[],//存放分公司理财省份证号
		"list":[]//存放理财师业绩
	}, {
		"businessUnitId":LabeledOrg[24].businessUnitId,
		"businessUnitName": LabeledOrg[24].businessUnitName,
		"businessUnitIdArr":arr2,
		"certNoArr":[],
		"list":[]
	}, {
		"businessUnitId":LabeledOrg[23].businessUnitId,
		"businessUnitName": LabeledOrg[23].businessUnitName,
		"businessUnitIdArr":arr3,
		"certNoArr":[],
		"list":[]
	}, {
		"businessUnitId":LabeledOrg[15].businessUnitId,
		"businessUnitName": LabeledOrg[15].businessUnitName,
		"businessUnitIdArr":arr4,
		"certNoArr":[],
		"list":[]
	}, {
		"businessUnitId":LabeledOrg[21].businessUnitId,
		"businessUnitName": LabeledOrg[21].businessUnitName,
		"businessUnitIdArr":arr5,
		"certNoArr":[],
		"list":[]
	}, {
		"businessUnitId":LabeledOrg[14].businessUnitId,
		"businessUnitName": LabeledOrg[14].businessUnitName,
		"businessUnitIdArr":arr6,
		"certNoArr":[],
		"list":[]
	}, {
		"businessUnitId":LabeledOrg[12].businessUnitId,
		"businessUnitName": LabeledOrg[12].businessUnitName,
		"businessUnitIdArr":arr7,
		"certNoArr":[],
		"list":[]
	}, {
		"businessUnitId":LabeledOrg[37].businessUnitId,
		"businessUnitName": LabeledOrg[37].businessUnitName,
		"businessUnitIdArr":arr8,
		"certNoArr":[],
		"list":[]
	}];
	//匹配理财师省份证id
	var allAccountManager = JSON.parse(sessionStorage.getItem("AllSystemUsers"));
	for(var k=0;k<allAccountManager.length;k++){
		var certNo = allAccountManager[k].certNo;//理财师身份证号
		var financialBusinessUnitId = allAccountManager[k].businessUnitId;//理财师的businessUnitId
		for(var m=0;m<departArr.length;m++){
			var indexBusinessUnitIdArr = departArr[m].businessUnitIdArr;
			var _index = indexBusinessUnitIdArr.indexOf(financialBusinessUnitId);
			if(-1 != _index&&_index!=null&&_index!=""){
				departArr[m].certNoArr.push(certNo);
			}
		}
	}
	for(var n=0;n<_block.length;n++){
		var id = _block[n].id;
		if(id){
			var dataBlock = _block[n];
			for(var a=0;a<departArr.length;a++){
				var _index2 = departArr[a].certNoArr.indexOf(id);
				if(-1 != _index2&&_index2!=null&&_index2!=""){
					departArr[a].list.push(dataBlock);
				}
			}
		}
	}
	console.log("整理完毕",departArr);
	
}
var LabeledOrg = [{
	"businessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"businessUnitName": "CRM",
	"parentBusinessUnitId": null,
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": null,
	"businessUnitLabel": "1",
	"businessUnitLabelId": 1,
	"businessUnitLabelParentId": 0,
	"parent_id": 0,
	"id": 1
}, {
	"businessUnitId": "F235B34F-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "财务管理部",
	"parentBusinessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1",
	"businessUnitLabel": "1.1",
	"businessUnitLabelId": 11,
	"businessUnitLabelParentId": 1,
	"parent_id": 1,
	"id": 11
}, {
	"businessUnitId": "F0F704ED-E1DF-E711-80B8-1866DAF3CBC5",
	"businessUnitName": "集团FOF基金事业部",
	"parentBusinessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1",
	"businessUnitLabel": "1.2",
	"businessUnitLabelId": 12,
	"businessUnitLabelParentId": 1,
	"parent_id": 1,
	"id": 12
}, {
	"businessUnitId": "13411171-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "集团产品研发部",
	"parentBusinessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1",
	"businessUnitLabel": "1.3",
	"businessUnitLabelId": 13,
	"businessUnitLabelParentId": 1,
	"parent_id": 1,
	"id": 13
}, {
	"businessUnitId": "D55D7049-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "人力资源部",
	"parentBusinessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1",
	"businessUnitLabel": "1.4",
	"businessUnitLabelId": 14,
	"businessUnitLabelParentId": 1,
	"parent_id": 1,
	"id": 14
}, {
	"businessUnitId": "EE35B34F-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "行政综合部",
	"parentBusinessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1",
	"businessUnitLabel": "1.5",
	"businessUnitLabelId": 15,
	"businessUnitLabelParentId": 1,
	"parent_id": 1,
	"id": 15
}, {
	"businessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "营销部门",
	"parentBusinessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1",
	"businessUnitLabel": "1.6",
	"businessUnitLabelId": 16,
	"businessUnitLabelParentId": 1,
	"parent_id": 1,
	"id": 16
}, {
	"businessUnitId": "9A99065F-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "执行部门",
	"parentBusinessUnitId": "7253B029-B64D-E711-80B4-1866DAF3CBC4",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1",
	"businessUnitLabel": "1.7",
	"businessUnitLabelId": 17,
	"businessUnitLabelParentId": 1,
	"parent_id": 1,
	"id": 17
}, {
	"businessUnitId": "2867785D-B83B-E811-80B9-1866DAF3CBC5",
	"businessUnitName": "杭州区域分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.1",
	"businessUnitLabelId": 161,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 161
}, {
	"businessUnitId": "777A130B-B73B-E811-80B9-1866DAF3CBC5",
	"businessUnitName": "环渤海区域分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.2",
	"businessUnitLabelId": 162,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 162
}, {
	"businessUnitId": "E05D402D-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "机构业务部",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.3",
	"businessUnitLabelId": 163,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 163
}, {
	"businessUnitId": "CA5EC236-9660-E711-80B7-1866DAF4BDB1",
	"businessUnitName": "江苏分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.4",
	"businessUnitLabelId": 164,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 164
}, {
	"businessUnitId": "589A4F19-5861-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "南昌分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.5",
	"businessUnitLabelId": 165,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 165
}, {
	"businessUnitId": "AC2B5E3D-5761-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "南京分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.6",
	"businessUnitLabelId": 166,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 166
}, {
	"businessUnitId": "295A0EE5-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "南通第一分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.7",
	"businessUnitLabelId": 167,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 167
}, {
	"businessUnitId": "0228D81F-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "宁波第一分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.8",
	"businessUnitLabelId": 168,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 168
}, {
	"businessUnitId": "5B2125BF-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "上海第二分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.9",
	"businessUnitLabelId": 169,
	"businessUnitLabelParentId": 16,
	"parent_id": 16,
	"id": 169
}, {
	"businessUnitId": "D607E1CA-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "上海第三分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.10",
	"businessUnitLabelId": 1610,
	"businessUnitLabelParentId": 161,
	"parent_id": 161,
	"id": 1610
}, {
	"businessUnitId": "89A73112-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "上海分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.11",
	"businessUnitLabelId": 1611,
	"businessUnitLabelParentId": 161,
	"parent_id": 161,
	"id": 1611
}, {
	"businessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "私人银行\\家庭办公室",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.12",
	"businessUnitLabelId": 1612,
	"businessUnitLabelParentId": 161,
	"parent_id": 161,
	"id": 1612
}, {
	"businessUnitId": "599AC305-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "销售支持部",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.13",
	"businessUnitLabelId": 1613,
	"businessUnitLabelParentId": 161,
	"parent_id": 161,
	"id": 1613
}, {
	"businessUnitId": "6F72F6F6-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "义乌第一分公司",
	"parentBusinessUnitId": "5A0AE43A-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6",
	"businessUnitLabel": "1.6.14",
	"businessUnitLabelId": 1614,
	"businessUnitLabelParentId": 161,
	"parent_id": 161,
	"id": 1614
}, {
	"businessUnitId": "6EA26B88-B83B-E811-80B9-1866DAF3CBC5",
	"businessUnitName": "杭州分公司",
	"parentBusinessUnitId": "2867785D-B83B-E811-80B9-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1",
	"businessUnitLabel": "1.6.1.1",
	"businessUnitLabelId": 1611,
	"businessUnitLabelParentId": 161,
	"parent_id": 161,
	"id": 1611
}, {
	"businessUnitId": "237650D9-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "杭州第二分公司",
	"parentBusinessUnitId": "6EA26B88-B83B-E811-80B9-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1",
	"businessUnitLabel": "1.6.1.1.1",
	"businessUnitLabelId": 16111,
	"businessUnitLabelParentId": 1611,
	"parent_id": 1611,
	"id": 16111
}, {
	"businessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "杭州第一分公司",
	"parentBusinessUnitId": "6EA26B88-B83B-E811-80B9-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1",
	"businessUnitLabel": "1.6.1.1.2",
	"businessUnitLabelId": 16112,
	"businessUnitLabelParentId": 1611,
	"parent_id": 1611,
	"id": 16112
}, {
	"businessUnitId": "A496B962-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "郭云武事业部",
	"parentBusinessUnitId": "237650D9-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.1",
	"businessUnitLabel": "1.6.1.1.1.1",
	"businessUnitLabelId": 161111,
	"businessUnitLabelParentId": 16111,
	"parent_id": 16111,
	"id": 161111
}, {
	"businessUnitId": "ED84306D-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "刘伟一事业部",
	"parentBusinessUnitId": "237650D9-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.1",
	"businessUnitLabel": "1.6.1.1.1.2",
	"businessUnitLabelId": 161112,
	"businessUnitLabelParentId": 16111,
	"parent_id": 16111,
	"id": 161112
}, {
	"businessUnitId": "395AB276-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "汪静容事业部",
	"parentBusinessUnitId": "237650D9-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.1",
	"businessUnitLabel": "1.6.1.1.1.3",
	"businessUnitLabelId": 161113,
	"businessUnitLabelParentId": 16111,
	"parent_id": 16111,
	"id": 161113
}, {
	"businessUnitId": "A6A4BC51-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "夏丹丹事业部",
	"parentBusinessUnitId": "237650D9-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.1",
	"businessUnitLabel": "1.6.1.1.1.4",
	"businessUnitLabelId": 161114,
	"businessUnitLabelParentId": 16111,
	"parent_id": 16111,
	"id": 161114
}, {
	"businessUnitId": "06FE7A88-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "周永挺事业部",
	"parentBusinessUnitId": "237650D9-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.1",
	"businessUnitLabel": "1.6.1.1.1.5",
	"businessUnitLabelId": 161115,
	"businessUnitLabelParentId": 16111,
	"parent_id": 16111,
	"id": 161115
}, {
	"businessUnitId": "5F970728-0AB6-E711-80B8-1866DAF4BDB1",
	"businessUnitName": "程涛事业部",
	"parentBusinessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.2",
	"businessUnitLabel": "1.6.1.1.2.1",
	"businessUnitLabelId": 161121,
	"businessUnitLabelParentId": 16112,
	"parent_id": 16112,
	"id": 161121
}, {
	"businessUnitId": "AA96CDA7-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "李海事业部",
	"parentBusinessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.2",
	"businessUnitLabel": "1.6.1.1.2.2",
	"businessUnitLabelId": 161122,
	"businessUnitLabelParentId": 16112,
	"parent_id": 16112,
	"id": 161122
}, {
	"businessUnitId": "6A4C6196-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "刘晓艳事业部",
	"parentBusinessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.2",
	"businessUnitLabel": "1.6.1.1.2.3",
	"businessUnitLabelId": 161123,
	"businessUnitLabelParentId": 16112,
	"parent_id": 16112,
	"id": 161123
}, {
	"businessUnitId": "5C9145A0-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "陆芳芳事业部",
	"parentBusinessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.2",
	"businessUnitLabel": "1.6.1.1.2.4",
	"businessUnitLabelId": 161124,
	"businessUnitLabelParentId": 16112,
	"parent_id": 16112,
	"id": 161124
}, {
	"businessUnitId": "5DDA7E3C-3333-E811-80B9-1866DAF3CBC5",
	"businessUnitName": "寿继敏事业部",
	"parentBusinessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.2",
	"businessUnitLabel": "1.6.1.1.2.5",
	"businessUnitLabelId": 161125,
	"businessUnitLabelParentId": 16112,
	"parent_id": 16112,
	"id": 161125
}, {
	"businessUnitId": "45080CC4-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "吴晓丽事业部",
	"parentBusinessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.2",
	"businessUnitLabel": "1.6.1.1.2.6",
	"businessUnitLabelId": 161126,
	"businessUnitLabelParentId": 16112,
	"parent_id": 16112,
	"id": 161126
}, {
	"businessUnitId": "1ED9D5E1-9864-E811-80BA-1866DAF4BDB1",
	"businessUnitName": "杨培事业部",
	"parentBusinessUnitId": "E100DCAC-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.1.1.2",
	"businessUnitLabel": "1.6.1.1.2.7",
	"businessUnitLabelId": 161127,
	"businessUnitLabelParentId": 16112,
	"parent_id": 16112,
	"id": 161127
}, {
	"businessUnitId": "00CC9939-B73B-E811-80B9-1866DAF3CBC5",
	"businessUnitName": "东营分公司",
	"parentBusinessUnitId": "777A130B-B73B-E811-80B9-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.2",
	"businessUnitLabel": "1.6.2.1",
	"businessUnitLabelId": 1621,
	"businessUnitLabelParentId": 162,
	"parent_id": 162,
	"id": 1621
}, {
	"businessUnitId": "10F2C307-5761-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "东营第一分公司",
	"parentBusinessUnitId": "00CC9939-B73B-E811-80B9-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.2.1",
	"businessUnitLabel": "1.6.2.1.1",
	"businessUnitLabelId": 16211,
	"businessUnitLabelParentId": 1621,
	"parent_id": 1621,
	"id": 16211
}, {
	"businessUnitId": "A858DD7C-4AE1-E711-80B8-1866DAF3CBC5",
	"businessUnitName": "常正欣事业部",
	"parentBusinessUnitId": "10F2C307-5761-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.2.1.1",
	"businessUnitLabel": "1.6.2.1.1.1",
	"businessUnitLabelId": 162111,
	"businessUnitLabelParentId": 16211,
	"parent_id": 16211,
	"id": 162111
}, {
	"businessUnitId": "DCE6C20F-94B5-E711-80B8-1866DAF4BDB1",
	"businessUnitName": "贾振莲事业部",
	"parentBusinessUnitId": "10F2C307-5761-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.2.1.1",
	"businessUnitLabel": "1.6.2.1.1.2",
	"businessUnitLabelId": 162112,
	"businessUnitLabelParentId": 16211,
	"parent_id": 16211,
	"id": 162112
}, {
	"businessUnitId": "B37086DC-6CCA-E711-80B8-1866DAF3CBC5",
	"businessUnitName": "项超事业部",
	"parentBusinessUnitId": "10F2C307-5761-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.2.1.1",
	"businessUnitLabel": "1.6.2.1.1.3",
	"businessUnitLabelId": 162113,
	"businessUnitLabelParentId": 16211,
	"parent_id": 16211,
	"id": 162113
}, {
	"businessUnitId": "224CFB6B-BF5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "成志强团队",
	"parentBusinessUnitId": "E05D402D-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.3",
	"businessUnitLabel": "1.6.3.1",
	"businessUnitLabelId": 1631,
	"businessUnitLabelParentId": 163,
	"parent_id": 163,
	"id": 1631
}, {
	"businessUnitId": "22EF0EA2-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "渠道部",
	"parentBusinessUnitId": "E05D402D-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.3",
	"businessUnitLabel": "1.6.3.2",
	"businessUnitLabelId": 1632,
	"businessUnitLabelParentId": 163,
	"parent_id": 163,
	"id": 1632
}, {
	"businessUnitId": "9FF64AFF-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "吴宏团队",
	"parentBusinessUnitId": "E05D402D-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.3",
	"businessUnitLabel": "1.6.3.3",
	"businessUnitLabelId": 1633,
	"businessUnitLabelParentId": 163,
	"parent_id": 163,
	"id": 1633
}, {
	"businessUnitId": "7023290C-BF5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "徐建兰团队",
	"parentBusinessUnitId": "E05D402D-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.3",
	"businessUnitLabel": "1.6.3.4",
	"businessUnitLabelId": 1634,
	"businessUnitLabelParentId": 163,
	"parent_id": 163,
	"id": 1634
}, {
	"businessUnitId": "9606A4F5-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "综合理财组",
	"parentBusinessUnitId": "E05D402D-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.3",
	"businessUnitLabel": "1.6.3.5",
	"businessUnitLabelId": 1635,
	"businessUnitLabelParentId": 163,
	"parent_id": 163,
	"id": 1635
}, {
	"businessUnitId": "B9441754-BF5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "金山分公司",
	"parentBusinessUnitId": "7023290C-BF5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.3.4",
	"businessUnitLabel": "1.6.3.4.1",
	"businessUnitLabelId": 16341,
	"businessUnitLabelParentId": 1634,
	"parent_id": 1634,
	"id": 16341
}, {
	"businessUnitId": "A0E8C365-BF5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "徐建兰直销",
	"parentBusinessUnitId": "7023290C-BF5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.3.4",
	"businessUnitLabel": "1.6.3.4.2",
	"businessUnitLabelId": 16342,
	"businessUnitLabelParentId": 1634,
	"parent_id": 1634,
	"id": 16342
}, {
	"businessUnitId": "2432D4C2-91B5-E711-80B8-1866DAF4BDB1",
	"businessUnitName": "鲁蔚华事业部",
	"parentBusinessUnitId": "589A4F19-5861-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.5",
	"businessUnitLabel": "1.6.5.1",
	"businessUnitLabelId": 1651,
	"businessUnitLabelParentId": 165,
	"parent_id": 165,
	"id": 1651
}, {
	"businessUnitId": "09477A84-91B5-E711-80B8-1866DAF4BDB1",
	"businessUnitName": "王秀琦事业部",
	"parentBusinessUnitId": "589A4F19-5861-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.5",
	"businessUnitLabel": "1.6.5.2",
	"businessUnitLabelId": 1652,
	"businessUnitLabelParentId": 165,
	"parent_id": 165,
	"id": 1652
}, {
	"businessUnitId": "BF360CD4-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "毛赤宇事业部",
	"parentBusinessUnitId": "295A0EE5-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.7",
	"businessUnitLabel": "1.6.7.1",
	"businessUnitLabelId": 1671,
	"businessUnitLabelParentId": 167,
	"parent_id": 167,
	"id": 1671
}, {
	"businessUnitId": "36DFFB68-42F7-E711-80B9-1866DAF4BDB1",
	"businessUnitName": "徐一丹事业部",
	"parentBusinessUnitId": "295A0EE5-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.7",
	"businessUnitLabel": "1.6.7.2",
	"businessUnitLabelId": 1672,
	"businessUnitLabelParentId": 167,
	"parent_id": 167,
	"id": 1672
}, {
	"businessUnitId": "4D059A45-4070-E711-80B7-1866DAF4BDB1",
	"businessUnitName": "张华事业部",
	"parentBusinessUnitId": "0228D81F-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.8",
	"businessUnitLabel": "1.6.8.1",
	"businessUnitLabelId": 1681,
	"businessUnitLabelParentId": 168,
	"parent_id": 168,
	"id": 1681
}, {
	"businessUnitId": "A70FD0E5-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "张开柱事业部",
	"parentBusinessUnitId": "0228D81F-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.8",
	"businessUnitLabel": "1.6.8.2",
	"businessUnitLabelId": 1682,
	"businessUnitLabelParentId": 168,
	"parent_id": 168,
	"id": 1682
}, {
	"businessUnitId": "88ECFA1C-1699-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "张智霖事业部",
	"parentBusinessUnitId": "0228D81F-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.8",
	"businessUnitLabel": "1.6.8.3",
	"businessUnitLabelId": 1683,
	"businessUnitLabelParentId": 168,
	"parent_id": 168,
	"id": 1683
}, {
	"businessUnitId": "0A2597C1-BD5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "刘红兵事业部",
	"parentBusinessUnitId": "89A73112-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.11",
	"businessUnitLabel": "1.6.11.1",
	"businessUnitLabelId": 16111,
	"businessUnitLabelParentId": 1611,
	"parent_id": 1611,
	"id": 16111
}, {
	"businessUnitId": "78C18FD2-BD5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "刘捷事业部",
	"parentBusinessUnitId": "89A73112-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.11",
	"businessUnitLabel": "1.6.11.2",
	"businessUnitLabelId": 16112,
	"businessUnitLabelParentId": 1611,
	"parent_id": 1611,
	"id": 16112
}, {
	"businessUnitId": "7656FC1D-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "苏丽娟事业部",
	"parentBusinessUnitId": "89A73112-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.11",
	"businessUnitLabel": "1.6.11.3",
	"businessUnitLabelId": 16113,
	"businessUnitLabelParentId": 1611,
	"parent_id": 1611,
	"id": 16113
}, {
	"businessUnitId": "A239ED27-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "翁翊事业部",
	"parentBusinessUnitId": "89A73112-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.11",
	"businessUnitLabel": "1.6.11.4",
	"businessUnitLabelId": 16114,
	"businessUnitLabelParentId": 1611,
	"parent_id": 1611,
	"id": 16114
}, {
	"businessUnitId": "07AC3C37-BE5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "张振梅事业部",
	"parentBusinessUnitId": "89A73112-BB5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.11",
	"businessUnitLabel": "1.6.11.5",
	"businessUnitLabelId": 16115,
	"businessUnitLabelParentId": 1611,
	"parent_id": 1611,
	"id": 16115
}, {
	"businessUnitId": "BE9902A8-4170-E711-80B7-1866DAF4BDB1",
	"businessUnitName": "陈沐乔事业部",
	"parentBusinessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.12",
	"businessUnitLabel": "1.6.12.1",
	"businessUnitLabelId": 16121,
	"businessUnitLabelParentId": 1612,
	"parent_id": 1612,
	"id": 16121
}, {
	"businessUnitId": "D2B43819-1A99-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "蒋连国事业部",
	"parentBusinessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.12",
	"businessUnitLabel": "1.6.12.2",
	"businessUnitLabelId": 16122,
	"businessUnitLabelParentId": 1612,
	"parent_id": 1612,
	"id": 16122
}, {
	"businessUnitId": "AF849645-76EB-E711-80B8-1866DAF3CBC5",
	"businessUnitName": "李文超事业部",
	"parentBusinessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.12",
	"businessUnitLabel": "1.6.12.3",
	"businessUnitLabelId": 16123,
	"businessUnitLabelParentId": 1612,
	"parent_id": 1612,
	"id": 16123
}, {
	"businessUnitId": "A92D6028-4070-E711-80B7-1866DAF4BDB1",
	"businessUnitName": "浦东事业部",
	"parentBusinessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.12",
	"businessUnitLabel": "1.6.12.4",
	"businessUnitLabelId": 16124,
	"businessUnitLabelParentId": 1612,
	"parent_id": 1612,
	"id": 16124
}, {
	"businessUnitId": "F7DC6E1A-4070-E711-80B7-1866DAF4BDB1",
	"businessUnitName": "私人银行部",
	"parentBusinessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.12",
	"businessUnitLabel": "1.6.12.5",
	"businessUnitLabelId": 16125,
	"businessUnitLabelParentId": 1612,
	"parent_id": 1612,
	"id": 16125
}, {
	"businessUnitId": "176D23F8-07B6-E711-80B8-1866DAF4BDB1",
	"businessUnitName": "王阳事业部",
	"parentBusinessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.12",
	"businessUnitLabel": "1.6.12.6",
	"businessUnitLabelId": 16126,
	"businessUnitLabelParentId": 1612,
	"parent_id": 1612,
	"id": 16126
}, {
	"businessUnitId": "98ECEA19-AF88-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "杨军事业部",
	"parentBusinessUnitId": "CD71F083-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.12",
	"businessUnitLabel": "1.6.12.7",
	"businessUnitLabelId": 16127,
	"businessUnitLabelParentId": 1612,
	"parent_id": 1612,
	"id": 16127
}, {
	"businessUnitId": "5CE7C75C-4070-E711-80B7-1866DAF4BDB1",
	"businessUnitName": "季孝章事业部",
	"parentBusinessUnitId": "6F72F6F6-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.6.14",
	"businessUnitLabel": "1.6.14.1",
	"businessUnitLabelId": 16141,
	"businessUnitLabelParentId": 1614,
	"parent_id": 1614,
	"id": 16141
}, {
	"businessUnitId": "FF193538-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "客户服务部",
	"parentBusinessUnitId": "9A99065F-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.7",
	"businessUnitLabel": "1.7.1",
	"businessUnitLabelId": 171,
	"businessUnitLabelParentId": 17,
	"parent_id": 17,
	"id": 171
}, {
	"businessUnitId": "773A5E5F-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "品牌营销部",
	"parentBusinessUnitId": "9A99065F-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.7",
	"businessUnitLabel": "1.7.2",
	"businessUnitLabelId": 172,
	"businessUnitLabelParentId": 17,
	"parent_id": 17,
	"id": 172
}, {
	"businessUnitId": "0D417986-BB5F-E711-80B7-1866DAF3CBC5",
	"businessUnitName": "作业管理部",
	"parentBusinessUnitId": "9A99065F-BA5F-E711-80B7-1866DAF3CBC5",
	"parentBusinessUnitName": null,
	"parentBusinessUnitLabel": "1.7",
	"businessUnitLabel": "1.7.3",
	"businessUnitLabelId": 173,
	"businessUnitLabelParentId": 17,
	"parent_id": 17,
	"id": 173
}]