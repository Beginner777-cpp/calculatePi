const input = document.getElementById('num-digits'); //для получения входных данных(количество цифр для ПИ после запятой)
const output = document.getElementById('pi-digits'); //для отображения результата 
const time = document.querySelector('.time_spent');  //для отображения потраченного времени
//функция отображения состояния загрузки
function loadStart() {
    document.querySelector('.loader').style.display = 'flex';
}
//функция завершения состояния загрузки
function loadEnd() {
    document.querySelector('.loader').style.display = 'none';
}

//функция вычисления ПИ использующая алгоритм Spigot
function calculatePi(num) {
    let q = 1n, r = 180n, t = 60n, i = 2n; //проинициализируем начальные значения согласно алгоритму
    let pi = ''; //ПИ пока пустая строка
    //запустим бесконечный цикл с проверкой в конце
    while (true) {
        let y = (q * (27n * i - 12n) + 5n * r) / (5n * t); //значение одной цифры ПИ
        let u = 3n * (3n * i + 1n) * (3n * i + 2n);//вычисляем промежуточные значения
        r = 10n * u * (q * (5n * i - 2n) + r - y * t);//изменяем начальные параметры для дальнейших вычислений
        q = 10n * q * i * (2n * i - 1n);
        t = t * u;
        i = i + 1n;//увеличиваем шаг
        pi += y.toString()//добавлем к концу строки вычисленную новую цифру ПИ
        if (i === 3n) { pi += '.'; }
        //если длина ПИ удовлетворяет входным данным выходим из цикла
        if (pi.length >= num + 2) {
            break;
        }
    }
    return pi;
}

let pi = calculatePi(Number(input.value)); //получение знаечния ПИ по умолчанию(10 цифр после запятой)
output.innerHTML = pi; //отображение 10 цифр после запятой по умолчанию

// событие ввода данных(цифры после запятой)
input.addEventListener('input', () => {

    // используем промисы js для засечения начала и конца вычислений
    const prom = new Promise((resolve, reject) => {
        loadStart();// вызываем функцию для состояния загрузки 
        //начинаем вычисления после 0.5 секунд задержки(чтобы пользователь успел ввести данные)
        setTimeout(() => {
            //проверяем входные данные на корректность
            if (input.value != '' && input.value > 0 && !isNaN(input.value)) {
                var timeStart = new Date; //засекаем начало вычислений
                let pi = calculatePi(Number(input.value));
                output.innerHTML = pi;
            }
            var timeEnd = new Date; //конец вычислений
            var timeDif = (timeEnd - timeStart); //время потраченное на вычисления
            time.innerHTML = 'Потрачено: ' + timeDif / 1000 + ' секунд'; // отображаем потраченное время
            resolve(); //встроенная функция промисов означающая конец данного промиса
        }, 500)


    })
    //после окончания вычислений убираем состояние загрузки
    prom.then(() => {
        loadEnd();

        //раскомментируйте код ниже чтобы проверить корректность работы программы
        //если вернет true значит вычесленное значение ПИ совпадает с корректным значением
        // console.log(compare());
    })


})

//правильное значение ПИ взятое из источника https://digitsofpi.com/Top-30000-Digits-Of-Pi.htm
//для проверки корректности работы программы
let actualPi = `3.
141592653589793238462643383279502884197169399375105
82097494459230781640628620899862803482534211706798
21480865132823066470938446095505822317253594081284
81117450284102701938521105559644622948954930381964
42881097566593344612847564823378678316527120190914
56485669234603486104543266482133936072602491412737
24587006606315588174881520920962829254091715364367
89259036001133053054882046652138414695194151160943
30572703657595919530921861173819326117931051185480
74462379962749567351885752724891227938183011949129
83367336244065664308602139494639522473719070217986
09437027705392171762931767523846748184676694051320
00568127145263560827785771342757789609173637178721
46844090122495343014654958537105079227968925892354
20199561121290219608640344181598136297747713099605
18707211349999998372978049951059731732816096318595
02445945534690830264252230825334468503526193118817
10100031378387528865875332083814206171776691473035
98253490428755468731159562863882353787593751957781
85778053217122680661300192787661119590921642019893
80952572010654858632788659361533818279682303019520
35301852968995773622599413891249721775283479131515
57485724245415069595082953311686172785588907509838
17546374649393192550604009277016711390098488240128
58361603563707660104710181942955596198946767837449
44825537977472684710404753464620804668425906949129
33136770289891521047521620569660240580381501935112
53382430035587640247496473263914199272604269922796
78235478163600934172164121992458631503028618297455
57067498385054945885869269956909272107975093029553
21165344987202755960236480665499119881834797753566
36980742654252786255181841757467289097777279380008
16470600161452491921732172147723501414419735685481
61361157352552133475741849468438523323907394143334
54776241686251898356948556209921922218427255025425
68876717904946016534668049886272327917860857843838
27967976681454100953883786360950680064225125205117
39298489608412848862694560424196528502221066118630
67442786220391949450471237137869609563643719172874
67764657573962413890865832645995813390478027590099
46576407895126946839835259570982582262052248940772
67194782684826014769909026401363944374553050682034
96252451749399651431429809190659250937221696461515
70985838741059788595977297549893016175392846813826
86838689427741559918559252459539594310499725246808
45987273644695848653836736222626099124608051243884
39045124413654976278079771569143599770012961608944
16948685558484063534220722258284886481584560285060
16842739452267467678895252138522549954666727823986
45659611635488623057745649803559363456817432411251
50760694794510965960940252288797108931456691368672
28748940560101503308617928680920874760917824938589
00971490967598526136554978189312978482168299894872
26588048575640142704775551323796414515237462343645
42858444795265867821051141354735739523113427166102
13596953623144295248493718711014576540359027993440
37420073105785390621983874478084784896833214457138
68751943506430218453191048481005370614680674919278
19119793995206141966342875444064374512371819217999
83910159195618146751426912397489409071864942319615
67945208095146550225231603881930142093762137855956
63893778708303906979207734672218256259966150142150
30680384477345492026054146659252014974428507325186
66002132434088190710486331734649651453905796268561
00550810665879699816357473638405257145910289706414
01109712062804390397595156771577004203378699360072
30558763176359421873125147120532928191826186125867
32157919841484882916447060957527069572209175671167
22910981690915280173506712748583222871835209353965
72512108357915136988209144421006751033467110314126
71113699086585163983150197016515116851714376576183
51556508849099898599823873455283316355076479185358
93226185489632132933089857064204675259070915481416
54985946163718027098199430992448895757128289059232
33260972997120844335732654893823911932597463667305
83604142813883032038249037589852437441702913276561
80937734440307074692112019130203303801976211011004
49293215160842444859637669838952286847831235526582
13144957685726243344189303968642624341077322697802
80731891544110104468232527162010526522721116603966
65573092547110557853763466820653109896526918620564
76931257058635662018558100729360659876486117910453
34885034611365768675324944166803962657978771855608
45529654126654085306143444318586769751456614068007
00237877659134401712749470420562230538994561314071
12700040785473326993908145466464588079727082668306
34328587856983052358089330657574067954571637752542
02114955761581400250126228594130216471550979259230
99079654737612551765675135751782966645477917450112
99614890304639947132962107340437518957359614589019
38971311179042978285647503203198691514028708085990
48010941214722131794764777262241425485454033215718
53061422881375850430633217518297986622371721591607
71669254748738986654949450114654062843366393790039
76926567214638530673609657120918076383271664162748
88800786925602902284721040317211860820419000422966
17119637792133757511495950156604963186294726547364
25230817703675159067350235072835405670403867435136
22224771589150495309844489333096340878076932599397
80541934144737744184263129860809988868741326047215
69516239658645730216315981931951673538129741677294
78672422924654366800980676928238280689964004824354
03701416314965897940924323789690706977942236250822
16889573837986230015937764716512289357860158816175
57829735233446042815126272037343146531977774160319
90665541876397929334419521541341899485444734567383
16249934191318148092777710386387734317720754565453
22077709212019051660962804909263601975988281613323
16663652861932668633606273567630354477628035045077
72355471058595487027908143562401451718062464362679
45612753181340783303362542327839449753824372058353
11477119926063813346776879695970309833913077109870
40859133746414428227726346594704745878477872019277
15280731767907707157213444730605700733492436931138
35049316312840425121925651798069411352801314701304
78164378851852909285452011658393419656213491434159
56258658655705526904965209858033850722426482939728
58478316305777756068887644624824685792603953527734
80304802900587607582510474709164396136267604492562
74204208320856611906254543372131535958450687724602
90161876679524061634252257719542916299193064553779
91403734043287526288896399587947572917464263574552
54079091451357111369410911939325191076020825202618
79853188770584297259167781314969900901921169717372
78476847268608490033770242429165130050051683233643
50389517029893922334517220138128069650117844087451
96012122859937162313017114448464090389064495444006
19869075485160263275052983491874078668088183385102
28334508504860825039302133219715518430635455007668
28294930413776552793975175461395398468339363830474
61199665385815384205685338621867252334028308711232
82789212507712629463229563989898935821167456270102
18356462201349671518819097303811980049734072396103
68540664319395097901906996395524530054505806855019
56730229219139339185680344903982059551002263535361
92041994745538593810234395544959778377902374216172
71117236434354394782218185286240851400666044332588
85698670543154706965747458550332323342107301545940
51655379068662733379958511562578432298827372319898
75714159578111963583300594087306812160287649628674
46047746491599505497374256269010490377819868359381
46574126804925648798556145372347867330390468838343
63465537949864192705638729317487233208376011230299
11367938627089438799362016295154133714248928307220
12690147546684765357616477379467520049075715552781
96536213239264061601363581559074220202031872776052
77219005561484255518792530343513984425322341576233
61064250639049750086562710953591946589751413103482
27693062474353632569160781547818115284366795706110
86153315044521274739245449454236828860613408414863
77670096120715124914043027253860764823634143346235
18975766452164137679690314950191085759844239198629
16421939949072362346468441173940326591840443780513
33894525742399508296591228508555821572503107125701
26683024029295252201187267675622041542051618416348
47565169998116141010029960783869092916030288400269
10414079288621507842451670908700069928212066041837
18065355672525325675328612910424877618258297651579
59847035622262934860034158722980534989650226291748
78820273420922224533985626476691490556284250391275
77102840279980663658254889264880254566101729670266
40765590429099456815065265305371829412703369313785
17860904070866711496558343434769338578171138645587
36781230145876871266034891390956200993936103102916
16152881384379099042317473363948045759314931405297
63475748119356709110137751721008031559024853090669
20376719220332290943346768514221447737939375170344
36619910403375111735471918550464490263655128162288
24462575916333039107225383742182140883508657391771
50968288747826569959957449066175834413752239709683
40800535598491754173818839994469748676265516582765
84835884531427756879002909517028352971634456212964
04352311760066510124120065975585127617858382920419
74844236080071930457618932349229279650198751872127
26750798125547095890455635792122103334669749923563
02549478024901141952123828153091140790738602515227
42995818072471625916685451333123948049470791191532
67343028244186041426363954800044800267049624820179
28964766975831832713142517029692348896276684403232
60927524960357996469256504936818360900323809293459
58897069536534940603402166544375589004563288225054
52556405644824651518754711962184439658253375438856
90941130315095261793780029741207665147939425902989
69594699556576121865619673378623625612521632086286
92221032748892186543648022967807057656151446320469
27906821207388377814233562823608963208068222468012
24826117718589638140918390367367222088832151375560
03727983940041529700287830766709444745601345564172
54370906979396122571429894671543578468788614445812
31459357198492252847160504922124247014121478057345
51050080190869960330276347870810817545011930714122
33908663938339529425786905076431006383519834389341
59613185434754649556978103829309716465143840700707
36041123735998434522516105070270562352660127648483
08407611830130527932054274628654036036745328651057
06587488225698157936789766974220575059683440869735
02014102067235850200724522563265134105592401902742
16248439140359989535394590944070469120914093870012
64560016237428802109276457931065792295524988727584
61012648369998922569596881592056001016552563756785
66722796619885782794848855834397518744545512965634
43480396642055798293680435220277098429423253302257
63418070394769941597915945300697521482933665556615
67873640053666564165473217043903521329543529169414
59904160875320186837937023488868947915107163785290
23452924407736594956305100742108714261349745956151
38498713757047101787957310422969066670214498637464
59528082436944578977233004876476524133907592043401
96340391147320233807150952220106825634274716460243
35440051521266932493419673977041595683753555166730
27390074972973635496453328886984406119649616277344
95182736955882207573551766515898551909866653935494
81068873206859907540792342402300925900701731960362
25475647894064754834664776041146323390565134330684
49539790709030234604614709616968868850140834704054
60742958699138296682468185710318879065287036650832
43197440477185567893482308943106828702722809736248
09399627060747264553992539944280811373694338872940
63079261595995462624629707062594845569034711972996
40908941805953439325123623550813494900436427852713
83159125689892951964272875739469142725343669415323
61004537304881985517065941217352462589548730167600
29886592578662856124966552353382942878542534048308
33070165372285635591525347844598183134112900199920
59813522051173365856407826484942764411376393866924
80311836445369858917544264739988228462184490087776
97763127957226726555625962825427653183001340709223
34365779160128093179401718598599933849235495640057
09955856113498025249906698423301735035804408116855
26531170995708994273287092584878944364600504108922
66917835258707859512983441729535195378855345737426
08590290817651557803905946408735061232261120093731
08048548526357228257682034160504846627750450031262
00800799804925485346941469775164932709504934639382
43222718851597405470214828971117779237612257887347
71881968254629812686858170507402725502633290449762
77894423621674119186269439650671515779586756482399
39176042601763387045499017614364120469218237076488
78341968968611815581587360629386038101712158552726
68300823834046564758804051380801633638874216371406
43549556186896411228214075330265510042410489678352
85882902436709048871181909094945331442182876618103
10073547705498159680772009474696134360928614849417
85017180779306810854690009445899527942439813921350
55864221964834915126390128038320010977386806628779
23971801461343244572640097374257007359210031541508
93679300816998053652027600727749674584002836240534
60372634165542590276018348403068113818551059797056
64007509426087885735796037324514146786703688098806
09716425849759513806930944940151542222194329130217
39125383559150310033303251117491569691745027149433
15155885403922164097229101129035521815762823283182
34254832611191280092825256190205263016391147724733
14857391077758744253876117465786711694147764214411
11263583553871361011023267987756410246824032264834
64176636980663785768134920453022408197278564719839
63087815432211669122464159117767322532643356861461
86545222681268872684459684424161078540167681420808
85028005414361314623082102594173756238994207571362
75167457318918945628352570441335437585753426986994
72547031656613991999682628247270641336222178923903
17608542894373393561889165125042440400895271983787
38648058472689546243882343751788520143956005710481
19498842390606136957342315590796703461491434478863
60410318235073650277859089757827273130504889398900
99239135033732508559826558670892426124294736701939
07727130706869170926462548423240748550366080136046
68951184009366860954632500214585293095000090715105
82362672932645373821049387249966993394246855164832
61134146110680267446637334375340764294026682973865
22093570162638464852851490362932019919968828517183
95366913452224447080459239660281715655156566611135
98231122506289058549145097157553900243931535190902
10711945730024388017661503527086260253788179751947
80610137150044899172100222013350131060163915415895
78037117792775225978742891917915522417189585361680
59474123419339842021874564925644346239253195313510
33114763949119950728584306583619353693296992898379
14941939406085724863968836903265564364216644257607
91471086998431573374964883529276932822076294728238
15374099615455987982598910937171262182830258481123
89011968221429457667580718653806506487026133892822
99497257453033283896381843944770779402284359883410
03583854238973542439564755568409522484455413923941
00016207693636846776413017819659379971557468541946
33489374843912974239143365936041003523437770658886
77811394986164787471407932638587386247328896456435
98774667638479466504074111825658378878454858148962
96127399841344272608606187245545236064315371011274
68097787044640947582803487697589483282412392929605
82948619196670918958089833201210318430340128495116
20353428014412761728583024355983003204202451207287
25355811958401491809692533950757784000674655260314
46167050827682772223534191102634163157147406123850
42584598841990761128725805911393568960143166828317
63235673254170734208173322304629879928049085140947
90368878687894930546955703072619009502076433493359
10602454508645362893545686295853131533718386826561
78622736371697577418302398600659148161640494496501
17321313895747062088474802365371031150898427992754
42685327797431139514357417221975979935968525228574
52637962896126915723579866205734083757668738842664
05990993505000813375432454635967504844235284874701
44354541957625847356421619813407346854111766883118
65448937769795665172796623267148103386439137518659
46730024434500544995399742372328712494834706044063
47160632583064982979551010954183623503030945309733
58344628394763047756450150085075789495489313939448
99216125525597701436858943585877526379625597081677
64380012543650237141278346792610199558522471722017
77237004178084194239487254068015560359983905489857
23546745642390585850216719031395262944554391316631
34530893906204678438778505423939052473136201294769
18749751910114723152893267725339181466073000890277
68963114810902209724520759167297007850580717186381
05496797310016787085069420709223290807038326345345
20380278609905569001341371823683709919495164896007
55049341267876436746384902063964019766685592335654
63913836318574569814719621084108096188460545603903
84553437291414465134749407848844237721751543342603
06698831768331001133108690421939031080143784334151
37092435301367763108491351615642269847507430329716
74696406665315270353254671126675224605511995818319
63763707617991919203579582007595605302346267757943
93630746305690108011494271410093913691381072581378
13578940055995001835425118417213605572752210352680
37357265279224173736057511278872181908449006178013
88971077082293100279766593583875890939568814856026
32243937265624727760378908144588378550197028437793
62407825052704875816470324581290878395232453237896
02984166922548964971560698119218658492677040395648
12781021799132174163058105545988013004845629976511
21241536374515005635070127815926714241342103301566
16535602473380784302865525722275304999883701534879
30080626018096238151613669033411113865385109193673
93835229345888322550887064507539473952043968079067
08680644509698654880168287434378612645381583428075
30618454859037982179945996811544197425363443996029
02510015888272164745006820704193761584547123183460
07262933955054823955713725684023226821301247679452
26448209102356477527230820810635188991526928891084
55571126603965034397896278250016110153235160519655
90421184494990778999200732947690586857787872098290
13529566139788848605097860859570177312981553149516
81467176959760994210036183559138777817698458758104
46628399880600616229848616935337386578773598336161
33841338536842119789389001852956919678045544828584
83701170967212535338758621582310133103877668272115
72694951817958975469399264219791552338576623167627
54757035469941489290413018638611943919628388705436
77743224276809132365449485366768000001065262485473
05586159899914017076983854831887501429389089950685
45307651168033373222651756622075269517914422528081
65171667766727930354851542040238174608923283917032
75425750867655117859395002793389592057668278967764
45318404041855401043513483895312013263783692835808
27193783126549617459970567450718332065034556644034
49045362756001125018433560736122276594927839370647
84264567633881880756561216896050416113903906396016
20221536849410926053876887148379895599991120991646
46441191856827700457424343402167227644558933012778
15868695250694993646101756850601671453543158148010
54588605645501332037586454858403240298717093480910
55621167154684847780394475697980426318099175642280
98739987669732376957370158080682290459921236616890
25962730430679316531149401764737693873514093361833
21614280214976339918983548487562529875242387307755
95559554651963944018218409984124898262367377146722
60616336432964063357281070788758164043814850188411
43188598827694490119321296827158884133869434682859
00666408063140777577257056307294004929403024204984
16565479736705485580445865720227637840466823379852
82710578431975354179501134727362577408021347682604
50228515797957976474670228409995616015691089038458
24502679265942055503958792298185264800706837650418
36562094555434613513415257006597488191634135955671
96496540321872716026485930490397874895890661272507
94828276938953521753621850796297785146188432719223
22381015874445052866523802253284389137527384589238
44225354726530981715784478342158223270206902872323
30053862163479885094695472004795231120150432932266
28272763217790884008786148022147537657810581970222
63097174950721272484794781695729614236585957820908
30733233560348465318730293026659645013718375428897
55797144992465403868179921389346924474198509733462
67933210726868707680626399193619650440995421676278
40914669856925715074315740793805323925239477557441
59184582156251819215523370960748332923492103451462
64374498055961033079941453477845746999921285999993
99612281615219314888769388022281083001986016549416
54261696858678837260958774567618250727599295089318
05218729246108676399589161458550583972742098090978
17293239301067663868240401113040247007350857828724
62713494636853181546969046696869392547251941399291
46524238577625500474852954768147954670070503479995
88867695016124972282040303995463278830695976249361
51010243655535223069061294938859901573466102371223
54789112925476961760050479749280607212680392269110
27772261025441492215765045081206771735712027180242
96810620377657883716690910941807448781404907551782
03856539099104775941413215432844062503018027571696
50820964273484146957263978842560084531214065935809
04127113592004197598513625479616063228873618136737
32445060792441176399759746193835845749159880976674
47093006546342423460634237474666080431701260052055
92849369594143408146852981505394717890045183575515
41252235905906872648786357525419112888773717663748
60276606349603536794702692322971868327717393236192
00777452212624751869833495151019864269887847171939
66497690708252174233656627259284406204302141137199
22785269984698847702323823840055655517889087661360
13047709843861168705231055314916251728373272867600
72481729876375698163354150746088386636406934704372
06688651275688266149730788657015685016918647488541
67915459650723428773069985371390430026653078398776
38503238182155355973235306860430106757608389086270
49841888595138091030423595782495143988590113185835
84066747237029714978508414585308578133915627076035
63907639473114554958322669457024941398316343323789
75955680856836297253867913275055542524491943589128
40504522695381217913191451350099384631177401797151
22837854601160359554028644059024964669307077690554
81028850208085800878115773817191741776017330738554
75800605601433774329901272867725304318251975791679
29699650414607066457125888346979796429316229655201
68797300035646304579308840327480771811555330909887
02550520768046303460865816539487695196004408482065
96737947316808641564565053004988161649057883115434
54850526600698230931577765003780704661264706021457
50579327096204782561524714591896522360839664562410
51955105223572397395128818164059785914279148165426
32892004281609136937773722299983327082082969955737
72737566761552711392258805520189887620114168005468
73655806334716037342917039079863965229613128017826
79717289822936070288069087768660593252746378405397
69184808204102194471971386925608416245112398062011
31845412447820501107987607171556831540788654390412
10873032402010685341947230476666721749869868547076
78120512473679247919315085644477537985379973223445
61227858432968466475133365736923872014647236794278
70042503255589926884349592876124007558756946413705
62514001179713316620715371543600687647731867558714
87839890810742953094106059694431584775397009439883
94914432353668539209946879645066533985738887866147
62944341401049888993160051207678103588611660202961
19363968213496075011164983278563531614516845769568
71090029997698412632665023477167286573785790857466
46077228341540311441529418804782543876177079043000
15669867767957609099669360755949651527363498118964
13043311662774712338817406037317439705406703109676
76574869535878967003192586625941051053358438465602
33917967492678447637084749783336555790073841914731
98862713525954625181604342253729962863267496824058
06029642114638643686422472488728343417044157348248
18333016405669596688667695634914163284264149745333
49999480002669987588815935073578151958899005395120
85351035726137364034367534714104836017546488300407
84641674521673719048310967671134434948192626811107
39948250607394950735031690197318521195526356325843
39099822498624067031076831844660729124874754031617
96994113973877658998685541703188477886759290260700
43212666179192235209382278788809886335991160819235
35557046463491132085918979613279131975649097600013
99623444553501434642686046449586247690943470482932
94140411146540923988344435159133201077394411184074
10768498106634724104823935827401944935665161088463
12567852977697346843030614624180358529331597345830
38455410337010916767763742762102137013548544509263
07190114731848574923318167207213727935567952844392
54815609137281284063330393735624200160456645574145
88166052166608738748047243391212955877763906969037
07882852775389405246075849623157436917113176134783
88271941686066257210368513215664780014767523103935
78606896111259960281839309548709059073861351914591
81951029732787557104972901148717189718004696169777
00179139196137914171627070189584692143436967629274
59109940060084983568425201915593703701011049747339
49387788598941743303178534870760322198297057975119
14405109942358830345463534923498268836240433272674
15540301619505680654180939409982020609994140216890
90070821330723089662119775530665918814119157783627
29274615618571037217247100952142369648308641025928
87457999322374955191221951903424452307535133806856
80735446499512720317448719540397610730806026990625
80760202927314552520780799141842906388443734996814
58273372072663917670201183004648190002413083508846
58415214899127610651374153943565721139032857491876
90944137020905170314877734616528798482353382972601
36110984514841823808120540996125274580881099486972
21612852489742555551607637167505489617301680961380
38119143611439921063800508321409876045993093248510
25168294467260666138151745712559754953580239983146
98220361338082849935670557552471290274539776214049
31820146580080215665360677655087838043041343105918
04606800834591136640834887408005741272586704792258
31912741573908091438313845642415094084913391809684
02511639919368532255573389669537490266209232613188
55891580832455571948453875628786128859004106006073
74650140262782402734696252821717494158233174923968
35301361786536737606421667781377399510065895288774
27662636841830680190804609849809469763667335662282
91513235278880615776827815958866918023894033307644
19124034120223163685778603572769415417788264352381
31905028087018575047046312933353757285386605888904
58311145077394293520199432197117164223500564404297
98920815943071670198574692738486538334361457946341
75922573898588001698014757420542995801242958105456
51083104629728293758416116253256251657249807849209
98979906200359365099347215829651741357984910471116
60791587436986541222348341887722929446335178653856
73196255985202607294767407261676714557364981210567
77168934849176607717052771876011999081441130586455
77910525684304811440261938402322470939249802933550
73184589035539713308844617410795916251171486487446
86112476054286734367090466784686702740918810142497
11149657817724279347070216688295610877794405048437
52844337510882826477197854000650970403302186255614
73321177711744133502816088403517814525419643203095
76018694649088681545285621346988355444560249556668
43660292219512483091060537720198021831010327041783
86654471812603971906884623708575180800353270471856
59499476124248110999288679158969049563947624608424
06593094862150769031498702067353384834955083636601
78487710608098042692471324100094640143736032656451
84566792456669551001502298330798496079949882497061
72367449361226222961790814311414660941234159359309
58540791390872083227335495720807571651718765994498
56937956238755516175754380917805280294642004472153
96280746360211329425591600257073562812638733106005
89106524570802447493754318414940148211999627645310
68006631183823761639663180931444671298615527598201
45141027560068929750246304017351489194576360789352
85550531733141645705049964438909363084387448478396
16840518452732884032345202470568516465716477139323
77551729479512613239822960239454857975458651745878
77133181387529598094121742273003522965080891777050
68259248822322154938048371454781647213976820963320
50830564792048208592047549985732038887639160199524
09189389455767687497308569559580106595265030362661
59750662225084067428898265907510637563569968211510
94966974458054728869363102036782325018232370845979
01115484720876182124778132663304120762165873129708
11230758159821248639807212407868878114501655825136
17890307086087019897588980745664395515741536319319
19810705753366337380382721527988493503974800158905
19420879711308051233933221903466249917169150948541
40187106035460379464337900589095772118080446574396
28061867178610171567409676620802957665770512912099
07944304632892947306159510430902221439371849560634
05618934251305726829146578329334052463502892917547
08725648426003496296116541382300773133272983050016
02567240141851520418907011542885799208121984493156
99905918201181973350012618772803681248199587707020
75324063612593134385955425477819611429351635612234
96661522614735399674051584998603552953329245752388
81013620234762466905581643896786309762736550472434
86430712184943734853006063876445662721866617012381
27715621379746149861328744117714552444708997144522
88566294244023018479120547849857452163469644897389
20624019435183100882834802492490854030778638751659
11302873958787098100772718271874529013972836614842
14287170553179654307650453432460053636147261818096
99769334862640774351999286863238350887566835950972
65574815431940195576850437248001020413749831872259
67738715495839971844490727914196584593008394263702
08756353982169620553248032122674989114026785285996
73405242031091797899905718821949391320753431707980
02373659098537552023891164346718558290685371189795
26262344924833924963424497146568465912489185566295
89329909035239233333647435203707701010843880032907
59834217018554228386161721041760301164591878053936
74474720599850235828918336929223373239994804371084
19659473162654825748099482509991833006976569367159
68936449334886474421350084070066088359723503953234
01795825570360169369909886711321097988970705172807
55855191269930673099250704070245568507786790694766
12629808225163313639952117098452809263037592242674
25755998928927837047444521893632034894155210445972
61883800300677617931381399162058062701651024458869
24764924689192461212531027573139084047000714356136
23169923716948481325542009145304103713545329662063
92105479824392125172540132314902740585892063217589
49434548906846399313757091034633271415316223280552
29729795380188016285907357295541627886764982741861
64218789885741071649069191851162815285486794173638
90665388576422915834250067361245384916067413734017
35727799563410433268835695078149313780073623541800
70619180267328551191942676091221035987469241172837
49312616339500123959924050845437569850795704622266
46190001035004901830341535458428337643781119885563
18777792537201166718539541835984438305203762819440
76159410682071697030228515225057312609304689842343
31527321313612165828080752126315477306044237747535
05952287174402666389148817173086436111389069420279
08814311944879941715404210341219084709408025402393
29429454938786402305129271190975135360009219711054
12096683111516328705423028470073120658032626417116
16595761327235156666253667271899853419989523688483
09993027574199164638414270779887088742292770538912
2717248632202889842512528721782603050099451082478`;

actualPi = actualPi.replace(/\n/g, '');//убираем все символы перевода на новую строку(\n)

//функция для сравнения вычесленной ПИ с корректным значением 
function compare() {
    return actualPi == output.innerHTML;
}
