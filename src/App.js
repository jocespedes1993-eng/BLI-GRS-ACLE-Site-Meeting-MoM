import React, { useState, useMemo } from "react";

const GRS_RED = "#972D35";
const DARK = "#1e293b";
const STORAGE_KEY = "bli_mom_versions_v1";

const ATTS_D = [
  {n:"Joaquin Cespedes",i:"JC",c:"GRS",p:true},{n:"Daniel Pinilla",i:"DP",c:"GRS",p:false},
  {n:"Clothilde Poigeaut",i:"CP",c:"GRS",p:true},{n:"Sergio Sanchez",i:"SS",c:"GRS",p:true},
  {n:"Fabricio Zabala",i:"FZ",c:"GRS",p:true},{n:"Lautaro Serrano",i:"LS",c:"GRS",p:false},
  {n:"John Wetherell",i:"JW",c:"GRS",p:true},{n:"Ed Paroz",i:"EP",c:"GRS",p:false},
  {n:"Paul Joy",i:"PJ",c:"ACLE",p:true},{n:"Shane Fimmel",i:"SF",c:"ACLE",p:true},
  {n:"Ariel Cespedes",i:"AC",c:"ACLE",p:true},{n:"Janie Duval",i:"JD",c:"ACLE",p:true},
  {n:"Peter Symington",i:"PS",c:"ACLE",p:true},{n:"Ignacio Gaete",i:"IG",c:"ACLE",p:true},
  {n:"Luciano Gisande",i:"LG",c:"GRS",p:true},{n:"Katarzyna Janiczak",i:"KJ",c:"ACLE",p:true},
  {n:"Alejandra Leyton",i:"AL",c:"GRS",p:true},{n:"Stuart Happ",i:"SH",c:"ACLE",p:true},
  {n:"Enrique Dorado",i:"ED",c:"GRS",p:true},{n:"Santiago Colombo",i:"SC",c:"GRS",p:false},
];

const IMS_D = [
  {id:3,disc:"Logistics",subj:"Timbers (Unloading)",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"PO done, shared to supplier. Prepayment required. ETA site: W20.",dec:"GRS to review timber quantities following ACLE feedback.",act:"No",own:"--",dr:"2026-01-21",td:""},
  {id:5,disc:"Construction",subj:"Trackers survey & Data Design",resp:"ACLE",stat:"Open",pri:"High",notes:"Survey: Field 65.64%, ACLE 62.19%, GRE 32.29%. Design 8 full blocks ahead. Priority blocks 31-49 incl. north B20-30 south. GRS requests mowing support.",dec:"",act:"No",own:"--",dr:"2026-01-21",td:""},
  {id:9,disc:"Quality",subj:"Piles Bent in Delivery",resp:"GRS",stat:"Open",pri:"Low",notes:"Report from ACLE following PVH criteria is pending.",dec:"ACLE to update damaged quantities.",act:"Yes",own:"KJ",dr:"2026-03-06",td:"2026-04-23"},
  {id:10,disc:"Construction",subj:"Piling works",resp:"GRS",stat:"Open",pri:"High",notes:"Production: 18%, approx. 700 piles/day with 7-8 machines, DCB and COMBOX along with tracker piles.",dec:"",act:"No",own:"--",dr:"2026-03-06",td:""},
  {id:13,disc:"Logistics",subj:"Progress Summary",resp:"GRS",stat:"Open",pri:"Low",notes:"Warehouse: PVH 86, Tongwei 71. Deliveries Tue-Fri 12 trucks/day, Sat 6 trucks modules. Unloading: Piles/MS/SD/Controllers 100%, Tubes 20%, Panel Rails 43.48%, Modules 12%.",dec:"",act:"No",own:"--",dr:"2026-01-21",td:""},
  {id:15,disc:"Construction",subj:"Work Flow",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"Surveying: A1, A2NE, Blocks 41-45, 58-61, 76-77, 85-87, 80. Piling: 75->62->57S->50S->51N->57N->31->49. Earthworks: B62, B51 done, 41-44 current, 46 next.",dec:"",act:"No",own:"--",dr:"2026-03-06",td:""},
  {id:16,disc:"General",subj:"Project Documentation",resp:"GRS",stat:"Open",pri:"Low",notes:"GRS to share Module sorting maps via transmittal once updated with next batches of flash test data.",dec:"",act:"Yes",own:"JC",dr:"2026-03-06",td:"2026-05-01"},
  {id:21,disc:"Quality",subj:"Galvanization Manufacturing issue",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"Block 84 inspection: 45 piles to fix (8% total, 14% north, 6% south). Awaiting PVH zinc content confirmation. Criteria: uncoated/scratches = ACLE. Within PVH catalog = GRS punch list.",dec:"",act:"Yes",own:"JC",dr:"2026-03-06",td:"2026-04-30"},
  {id:23,disc:"HSE",subj:"Manual handling training",resp:"ACLE",stat:"Open",pri:"Low",notes:"Training records up to date. GRS noted manual handling injuries. ACLE updated training and carried out toolbox.",dec:"",act:"Yes",own:"SF",dr:"2026-03-06",td:""},
  {id:27,disc:"Construction",subj:"Quarantine and Storage Areas",resp:"ACLE",stat:"Open",pri:"Low",notes:"Quarantine Areas: Blocks 3, 50, 75. Storage areas: B51/B36/B10.",dec:"ACLE to update quarantine areas per acceptance criteria.",act:"No",own:"--",dr:"2026-03-06",td:""},
  {id:28,disc:"Construction",subj:"DCB piles",resp:"ACLE",stat:"Open",pri:"Low",notes:"ACLE to confirm next handover date for 5-block gap; expecting to catch up on painting works.",dec:"GRS, ACLE and CTC to meet for site inspection at 10am, 17th April.",act:"No",own:"--",dr:"2026-03-06",td:""},
  {id:29,disc:"Construction",subj:"Roads and traffic",resp:"GRS",stat:"Open",pri:"Medium",notes:"GRS civil working on aux road in front of ACLE compound. GRS to slash footprint path on west side to study aux route.",dec:"ACLE to provide feedback on LV vehicle use around B62S; GRS to assess allowing access track.",act:"Yes",own:"JC",dr:"2026-03-06",td:"2026-05-01"},
  {id:31,disc:"HSE",subj:"GRS TMP",resp:"GRS/ACLE",stat:"Closed",pri:"Low",notes:"ACLE updating TMP per GRS TMP. GRS noted future TMP updates and access road works.",dec:"ACLE to share TMP considering pedestrian traffic around Winslow compound.",act:"Yes",own:"AC",dr:"2026-03-12",td:"2026-04-23"},
  {id:34,disc:"HSE",subj:"EMRP",resp:"GRS/ACLE",stat:"Closed",pri:"Low",notes:"ACLE included ambulance pick-up point. To share after GRS provides new Compound layout.",dec:"",act:"Yes",own:"SF",dr:"2026-03-12",td:"2026-04-23"},
  {id:37,disc:"Quality",subj:"Tools Calibration",resp:"ACLE",stat:"Open",pri:"Low",notes:"ACLE sent calibration certificates. Currently under review.",dec:"",act:"No",own:"--",dr:"2026-03-12",td:""},
  {id:38,disc:"Logistics",subj:"Bins",resp:"ACLE",stat:"Open",pri:"Low",notes:"Three additional FL bins requested. Lift bins to weekly service once ACLE confirms. Two hook bins in field; GRS working on 2 more.",dec:"",act:"No",own:"--",dr:"2026-03-06",td:""},
  {id:39,disc:"Quality",subj:"Pile Twists Inspection",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"DCBox Piles Blocks 81-84 approved. Plumb and twist within tolerances. Joint inspection pending.",dec:"ACLE and GRS to do checks together on installed piles to align checking methodology.",act:"Yes",own:"LG",dr:"2026-04-02",td:"2026-04-23"},
  {id:42,disc:"Construction",subj:"Materials",resp:"GRS",stat:"Open",pri:"Low",notes:"ACLE received central components system materials. Only 9.4km corrugated conduit pending delivery.",dec:"",act:"No",own:"--",dr:"",td:""},
  {id:43,disc:"Construction",subj:"Golden Rows",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"ACLE to install modules in golden row on 28th April.",dec:"",act:"No",own:"--",dr:"",td:""},
  {id:44,disc:"Quality",subj:"Blocks Handover",resp:"ACLE",stat:"Open",pri:"Low",notes:"Awaiting ACLE schedule for blocks with manufacturer issues fixed. Block 83: piles near tolerance, 2 twisted. Pending: DCBox B81 and Tracker B83 as-builts and paint.",dec:"",act:"No",own:"--",dr:"2026-04-16",td:""},
  {id:45,disc:"HSE",subj:"Resources",resp:"ACLE",stat:"Open",pri:"Low",notes:"ACLE working on 2nd HSE advisor. SK Solar on site 27 May. GRS requests workshop for labourers at Bungadoore.",dec:"",act:"No",own:"--",dr:"2026-04-09",td:""},
  {id:46,disc:"HSE",subj:"HSE monthly report",resp:"ACLE",stat:"Open",pri:"Low",notes:"ACLE provided latest monthly report.",dec:"",act:"No",own:"--",dr:"2026-04-09",td:""},
  {id:47,disc:"Quality",subj:"ACLE QA Inspections",resp:"ACLE",stat:"Open",pri:"Low",notes:"ACLE shared sampling process; under review. GRS requires notice for client witness point once drilling on extracted piles completed.",dec:"",act:"No",own:"--",dr:"2026-04-16",td:""},
  {id:48,disc:"Construction",subj:"Central Post Design",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"GRS updated design; ACLE doing retaps. 291 retaps required (>10mm); ACLE says approx. 150 finally needed.",dec:"",act:"No",own:"--",dr:"2026-04-16",td:""},
  {id:49,disc:"Construction",subj:"DBOX Installation Timeframe",resp:"GRS",stat:"Open",pri:"Low",notes:"No issue until Nov (low temps). At 25C GRS will monitor; at 30C avoid exposure by installing last DBOX section later or covering with module.",dec:"",act:"No",own:"--",dr:"2026-04-16",td:""},
  {id:51,disc:"HSE",subj:"Windspeed and Work Criteria",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"Preliminary criteria: avg 45km/h or gusts over 60km/h evaluate continuation; avg above 45km/h no module unloading.",dec:"GRS and ACLE to keep track of criteria established.",act:"No",own:"--",dr:"2026-04-16",td:""},
  {id:52,disc:"Quality",subj:"Punchlist items",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"GRS created punchlist for Piling Installation (Tracker post and DCBox Post). Keep updated with comments from rectifications.",dec:"",act:"No",own:"--",dr:"2026-04-24",td:""},
  {id:53,disc:"HSE",subj:"Incident Reporting",resp:"ACLE",stat:"Open",pri:"Low",notes:"GRS requested preliminary report same day; final to follow. Reportable injuries must also be notified same day to avoid GRS-Client reporting breach.",dec:"",act:"No",own:"--",dr:"2026-04-24",td:""},
  {id:54,disc:"Logistics",subj:"Testing of Impact Shock",resp:"ACLE",stat:"Open",pri:"Low",notes:"GRS to confirm if testing will be performed. ACLE will not separate boxes (too many).",dec:"",act:"Yes",own:"FZ",dr:"2026-04-24",td:"2026-05-01"},
];

const DISCS = ["Construction","Logistics","Quality","HSE","General"];
const RESPS = ["GRS","ACLE","GRS/ACLE"];
const STATS = ["Open","Closed"];
const PRIS  = ["Low","Medium","High"];
const INIS  = ["--","JC","DP","CP","SS","FZ","LS","JW","EP","PJ","SF","AC","JD","PS","IG","LG","KJ","AL","SH","ED","SC"];

const CONTACTS = {
  "JC":{name:"Joaquin Cespedes",        email:"jcespedes@gransolar.com"},
  "DP":{name:"Daniel Pinilla Bertuzzi", email:"dbertuzzi@gransolar.com"},
  "CP":{name:"Clothilde Poigeaut",      email:"cpoigeaut@gransolar.com"},
  "SS":{name:"Sergio Sanchez Artime",   email:"ssanchez@gransolar.com"},
  "FZ":{name:"Fabricio Zabala",         email:"fzabala@gransolar.com"},
  "LS":{name:"Lautaro Serrano",         email:"lserrano@gransolar.com"},
  "JW":{name:"John Wetherell",          email:"jwetherell@gransolar.com"},
  "EP":{name:"Ed Paroz",                email:"eparoz@gransolar.com"},
  "PJ":{name:"Paul Joy",                email:"paul.joy@acle.com.au"},
  "SF":{name:"Shane Fimmel",            email:"shane.fimmel@acle.com.au"},
  "AC":{name:"Ariel Cespedes",          email:"ariel.cespedes@acle.com.au"},
  "JD":{name:"Janie Duval",             email:"j.duval@acle.com.au"},
  "PS":{name:"Peter Symington",         email:"peter.symington@acle.com.au"},
  "IG":{name:"Ignacio Gaete Forno",     email:"ignacio.forno@acle.com.au"},
  "LG":{name:"Luciano Gisande",         email:"lgisande@gransolar.com"},
  "KJ":{name:"Katarzyna Janiczak",      email:"k.hincyngier@acle.com.au"},
  "AL":{name:"Alejandra Leyton",        email:"aleyton@gransolar.com"},
  "SH":{name:"Stuart Happ",             email:""},
  "ED":{name:"Enrique Dorado Banus",    email:"edbanus@gransolar.com"},
  "SC":{name:"Santiago Colombo",        email:"scolombo@gransolar.com"},
};

function gToday() { return new Date().toISOString().split("T")[0]; }
function ddiff(a,b) { if(!a||!b) return null; return Math.round((new Date(a)-new Date(b))/864e5); }
function fmtD(d) { if(!d) return "--"; var p=d.split("-"); return p[2]+"-"+p[1]+"-"+p[0].slice(2); }
function p3(n) { return String(n).padStart(3,"0"); }
function respColor(r) { return (r==="GRS"||r==="GRS/ACLE") ? GRS_RED : "#1e293b"; }
function uid() { return Date.now().toString(36)+Math.random().toString(36).slice(2,6); }

// ── Reminder helpers ─────────────────────────────────────────
function getReminderGroups(items) {
  var td = gToday();
  var groups = {};
  items.forEach(function(it){
    if(it.act!=="Yes" || it.stat!=="Open" || !it.td || !it.own || it.own==="--") return;
    var due = ddiff(it.td, td);
    if(due!==1 && due!==3) return;
    if(!groups[it.own]) groups[it.own] = {due:due, items:[]};
    groups[it.own].items.push(it);
  });
  return groups;
}

function buildMailtoLink(own, ownerItems, due) {
  var contact = CONTACTS[own] || {name:own, email:""};
  var firstName = contact.name.split(" ")[0];
  var dueLabel = due===1 ? "tomorrow" : "in 3 days";
  var subj = "[REMINDER] BLI Site MoM - Action Required - Due "+dueLabel;
  var sep = "\n"+Array(65).join("-")+"\n";
  var rows = ownerItems.map(function(it){
    var cols = [
      "#"+it.id,
      "Subject: "+it.subj,
      "Notes: "+it.notes,
      "Decision: "+(it.dec||"--"),
      "Owner: "+own,
      "Target Date: "+fmtD(it.td),
    ];
    return cols.join("\n");
  }).join(sep);
  var body =
    "Dear "+firstName+",\n\n"
    +"This is a kind reminder for you to Act on your open item in line with the Decision/Direction given:\n"
    +sep+rows+sep+"\n"
    +"If you have already completed your action, please let me know to mark this item as completed.\n\n"
    +"Kind regards,\nJoaquin";
  return "mailto:"+contact.email
    +"?cc=jcespedes%40gransolar.com"
    +"&subject="+encodeURIComponent(subj)
    +"&body="+encodeURIComponent(body);
}

// ── Version storage ──────────────────────────────────────────
function loadVersions() {
  try { var r=localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):null; } catch(e){return null;}
}
function persistVersions(vs) {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify(vs)); } catch(e){}
}
function defaultVersion() {
  return {id:uid(),name:"MOM-008 (initial)",ts:gToday(),
    doc:{num:8,meet:"2026-04-24",issue:"2026-04-24"},
    atts:ATTS_D,items:IMS_D,nxtId:55};
}
function initVersionStore() {
  var stored=loadVersions();
  if(stored&&stored.versions&&stored.versions.length>0) return stored;
  var v=defaultVersion();
  return {versions:[v],activeId:v.id};
}

// ── Print ────────────────────────────────────────────────────
function buildPrint(doc,atts,items) {
  var td=gToday();
  var tpts=td.split("-");
  var dcode=tpts[2]+tpts[1]+tpts[0].slice(2);
  var fname="BLI-GRS-ACLE-Weekly Meetings - MoM-"+p3(doc.num)+" ("+dcode+")";
  var aRows=atts.map(function(a){
    return "<tr><td>"+a.n+"</td><td align='center'>"+a.i+"</td><td align='center'>"+a.c+"</td>"
      +"<td align='center' style='color:"+(a.p?"#16a34a":"#dc2626")+";font-weight:bold'>"+(a.p?"Yes":"No")+"</td></tr>";
  }).join("");
  var iRows=items.map(function(it){
    var age=(it.act==="Yes"&&it.dr)?ddiff(td,it.dr):null;
    var due=(it.act==="Yes"&&it.td)?ddiff(it.td,td):null;
    var dc=due!=null?(due<0?"#dc2626":due<=3?"#d97706":"#16a34a"):"#666";
    var sc=it.stat==="Open"?"#dc2626":"#16a34a";
    return "<tr style='border-bottom:1px solid #e2e8f0'>"
      +"<td align='center'><b>"+it.id+"</b></td><td>"+it.disc+"</td><td>"+it.subj+"</td>"
      +"<td align='center' style='color:"+respColor(it.resp)+";font-weight:bold'>"+it.resp+"</td>"
      +"<td style='color:"+sc+";font-weight:bold'>"+it.stat+"</td><td>"+it.pri+"</td>"
      +"<td style='white-space:pre-wrap;max-width:200px'>"+it.notes+"</td>"
      +"<td style='white-space:pre-wrap;max-width:150px'>"+it.dec+"</td>"
      +"<td align='center' style='color:"+(it.act==="Yes"?"#16a34a":"#6b7280")+";font-weight:bold'>"+it.act+"</td>"
      +"<td align='center'>"+(it.act==="Yes"?it.own:"--")+"</td>"
      +"<td align='center'>"+fmtD(it.dr)+"</td>"
      +"<td align='center'>"+(it.act==="Yes"&&it.td?fmtD(it.td):"--")+"</td>"
      +"<td align='center'>"+(age!=null?age:"--")+"</td>"
      +"<td align='center' style='color:"+dc+";font-weight:bold'>"+(due!=null?due:"--")+"</td></tr>";
  }).join("");
  var h=[];
  h.push("<!DOCTYPE html><html><head><title>"+fname+"</title>");
  h.push("<style>body{font-family:Calibri,sans-serif;font-size:9px;margin:10mm 8mm}h2{font-size:13px;text-align:center;margin:6px 0}table{border-collapse:collapse}th{background:"+GRS_RED+";color:#fff;padding:3px 5px}td{border:none;border-bottom:1px solid #e2e8f0;padding:2px 4px;vertical-align:top}@media print{@page{size:A3 landscape;margin:8mm}}</style></head><body>");
  h.push("<div style='display:flex;justify-content:space-between;margin-bottom:6px'><table style='border:none'>");
  h.push("<tr><td style='border:none'><b>Last print:</b></td><td style='border:none'>BLI-GRS-ACL-MOM-"+p3(doc.num-1)+"</td></tr>");
  h.push("<tr><td style='border:none'><b>This Document:</b></td><td style='border:none;font-weight:bold;color:"+GRS_RED+"'>BLI-GRS-ACL-MOM-"+p3(doc.num)+"</td></tr></table></div>");
  h.push("<h2>BLI-GRS-ACLE- Site Meetings - MOM</h2>");
  h.push("<div style='display:flex;justify-content:space-between;margin-bottom:8px'>");
  h.push("<div><u><b>Attendees</b></u><br><table><tr><th>Name</th><th>Initial</th><th>Company</th><th>Present</th></tr>"+aRows+"</table></div>");
  h.push("<div style='text-align:right;font-size:10px'><div><b>Meeting date</b> "+fmtD(doc.meet)+"</div><div><b>Issue date</b> "+fmtD(td)+"</div><div><b>Today</b> "+fmtD(td)+"</div></div></div>");
  h.push("<table style='width:100%'><thead><tr>");
  ["Item","Discipline","Subject","Responsible","Status","Priority","Current meeting - Notes","Decision / Direction","Action","Owner","Date raised","Target Date","Age","Due days"].forEach(function(c){h.push("<th>"+c+"</th>");});
  h.push("</tr></thead><tbody>"+iRows+"</tbody></table>");
  h.push("<div style='text-align:center;font-size:8px;color:#999;margin-top:10px'>rev0 -- "+fname+"</div></body></html>");
  return h.join("");
}

// ── App ──────────────────────────────────────────────────────
export default function App() {
  var store = initVersionStore();
  var [versions,setVersions]     = useState(store.versions);
  var [activeId,setActiveId]     = useState(store.activeId);
  var [showVersions,setShowVersions] = useState(false);
  var [showReminders,setShowReminders] = useState(false);
  var [saveAsName,setSaveAsName] = useState("");
  var [showSaveAs,setShowSaveAs] = useState(false);
  var [headerCollapsed,setHeaderCollapsed] = useState(false);
  var [showA,setShowA]           = useState(true);
  var [toast,setToast]           = useState("");
  var [sortCol,setSortCol]       = useState(null);
  var [sortDir,setSortDir]       = useState("asc");
  var [filters,setFilters]       = useState({disc:"",stat:"",pri:"",resp:""});

  var active = versions.find(function(v){return v.id===activeId;})||versions[0];
  var doc=active.doc, atts=active.atts, items=active.items, nxtId=active.nxtId;

  function persist(nv,naid){
    setVersions(nv);
    if(naid!==undefined) setActiveId(naid);
    persistVersions({versions:nv,activeId:naid!==undefined?naid:activeId});
  }
  function updateActive(patch){
    persist(versions.map(function(v){return v.id===activeId?Object.assign({},v,patch):v;}));
  }
  function setDoc(fn)  {updateActive({doc:  typeof fn==="function"?fn(doc):fn});}
  function setAtts(fn) {updateActive({atts: typeof fn==="function"?fn(atts):fn});}
  function setItems(fn){updateActive({items:typeof fn==="function"?fn(items):fn});}
  function setNxtId(fn){updateActive({nxtId:typeof fn==="function"?fn(nxtId):fn});}

  function pop(msg){setToast(msg);setTimeout(function(){setToast("");},2500);}
  function save(){updateActive({ts:gToday()});pop("Saved");}

  function doSaveAs(){
    var name=saveAsName.trim()||("MOM-"+p3(doc.num)+" ("+fmtD(gToday())+")");
    var v={id:uid(),name:name,ts:gToday(),
      doc:JSON.parse(JSON.stringify(doc)),
      atts:JSON.parse(JSON.stringify(atts)),
      items:JSON.parse(JSON.stringify(items)),nxtId:nxtId};
    var nv=[...versions,v];
    persist(nv,v.id);
    setSaveAsName("");setShowSaveAs(false);setShowVersions(false);
    pop("Saved as: "+name);
  }
  function newVersion(){
    var v=defaultVersion(); v.name="New MOM ("+fmtD(gToday())+")";
    persist([...versions,v],v.id);
    setShowVersions(false);pop("New version created");
  }
  function deleteVersion(id){
    if(versions.length===1){pop("Cannot delete the only version.");return;}
    var nv=versions.filter(function(v){return v.id!==id;});
    var naid=activeId===id?nv[nv.length-1].id:activeId;
    persist(nv,naid);pop("Version deleted");
  }
  function switchVersion(id){
    setActiveId(id);persistVersions({versions:versions,activeId:id});
    setShowVersions(false);setSortCol(null);setFilters({disc:"",stat:"",pri:"",resp:""});
    pop("Switched version");
  }
  function doReset(){setAtts(function(p){return p.map(function(a){return Object.assign({},a,{p:false});});});pop("Attendees reset to N");}

  function newItem(afterId){
    var it={id:nxtId,disc:"Construction",subj:"",resp:"GRS",stat:"Open",pri:"Low",notes:"",dec:"",act:"No",own:"--",dr:gToday(),td:""};
    setItems(function(p){
      if(afterId==null) return [...p,it];
      var idx=p.findIndex(function(x){return x.id===afterId;});
      var c=[...p];c.splice(idx+1,0,it);return c;
    });
    setNxtId(function(n){return n+1;});
  }
  function upd(id,f,v){
    setItems(function(p){return p.map(function(it){
      if(it.id!==id) return it;
      var u=Object.assign({},it,{[f]:v});
      if(f==="act"&&v==="No"){u.own="--";u.td="";}
      return u;
    });});
  }
  function del(id){setItems(function(p){return p.filter(function(i){return i.id!==id;});});}
  function togA(i){setAtts(function(p){return p.map(function(a,j){return j===i?Object.assign({},a,{p:!a.p}):a;});});}
  function toggleSort(col){
    if(sortCol===col) setSortDir(function(d){return d==="asc"?"desc":"asc";});
    else{setSortCol(col);setSortDir("asc");}
  }

  var today=gToday();
  var reminderGroups=useMemo(function(){return getReminderGroups(items);},[items]);
  var reminderCount=Object.keys(reminderGroups).length;

  var displayed=useMemo(function(){
    var res=items.filter(function(i){
      return(!filters.disc||i.disc===filters.disc)
           &&(!filters.stat||i.stat===filters.stat)
           &&(!filters.pri ||i.pri ===filters.pri)
           &&(!filters.resp||i.resp===filters.resp);
    });
    if(sortCol){
      var dir=sortDir==="asc"?1:-1;
      res=[...res].sort(function(a,b){
        if(sortCol==="id") return dir*(a.id-b.id);
        return dir*String(a[sortCol]).localeCompare(String(b[sortCol]));
      });
    }
    return res;
  },[items,filters,sortCol,sortDir]);

  var overdue=items.filter(function(i){return i.act==="Yes"&&i.td&&ddiff(i.td,today)<0;}).length;

  var btnW={background:"#fff",color:GRS_RED,border:"1px solid #e2b4b7",borderRadius:4,padding:"3px 10px",fontSize:"11px",fontWeight:"bold",cursor:"pointer"};
  var thSt={padding:"5px 7px",borderRight:"1px solid rgba(255,255,255,0.2)",textAlign:"left",fontSize:"11px",color:"#fff",background:GRS_RED,whiteSpace:"nowrap",cursor:"pointer",userSelect:"none",position:"sticky",top:0,zIndex:10};
  var thNS=Object.assign({},thSt,{cursor:"default"});
  var fltSt={fontSize:"11px",border:"1px solid #d1d5db",borderRadius:4,padding:"2px 5px",background:"#fff"};
  var tdSt={borderBottom:"1px solid #e2e8f0",borderRight:"none",borderLeft:"none",borderTop:"none",padding:"2px 4px",verticalAlign:"top"};
  var selSt={background:"transparent",fontSize:"11px",border:"none",outline:"none"};
  var inSt={background:"transparent",fontSize:"11px",border:"none",outline:"none"};
  var taSt={background:"transparent",fontSize:"11px",border:"none",outline:"none",fontFamily:"Calibri,sans-serif",resize:"vertical",minHeight:"38px",width:"100%"};
  var modalBg={position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.4)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"};
  var modalBox={background:"#fff",borderRadius:8,padding:20,width:520,maxWidth:"95vw",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.2)"};

  function sa(c){return sortCol===c?(sortDir==="asc"?" ^":" v"):"";}
  function statColor(s){return s==="Open"?"#dc2626":"#16a34a";}
  function priColor(p){return p==="High"?"#dc2626":p==="Medium"?"#d97706":"#6b7280";}
  function dueColor(d){return d<0?"#dc2626":d<=3?"#d97706":"#16a34a";}

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"Calibri,sans-serif",fontSize:"12px"}}>

      {toast&&<div style={{position:"fixed",top:10,right:10,zIndex:999,background:DARK,color:"#fff",fontSize:"12px",padding:"6px 14px",borderRadius:5}}>{toast}</div>}

      {/* ── Reminders Modal ── */}
      {showReminders&&(
        <div style={modalBg} onClick={function(e){if(e.target===e.currentTarget)setShowReminders(false);}}>
          <div style={modalBox}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <b style={{fontSize:"13px",color:DARK}}>Email Reminders — Active Version: {active.name}</b>
              <button onClick={function(){setShowReminders(false);}} style={{background:"none",border:"none",fontSize:"18px",cursor:"pointer",color:"#6b7280"}}>x</button>
            </div>
            <div style={{fontSize:"11px",color:"#64748b",marginBottom:12,padding:"6px 10px",background:"#f8fafc",borderRadius:4,border:"1px solid #e2e8f0"}}>
              Reminders are generated for open action items with a Target Date due in <b>exactly 1 day</b> or <b>3 days</b> from today ({fmtD(today)}). Clicking "Draft in Outlook" opens your default email client pre-filled.
            </div>
            {reminderCount===0?(
              <div style={{textAlign:"center",padding:"30px 0",color:"#94a3b8",fontSize:"12px"}}>
                No reminders due today.<br/>
                <span style={{fontSize:"10px"}}>Items due in 1 or 3 days will appear here automatically.</span>
              </div>
            ):(
              Object.keys(reminderGroups).map(function(own){
                var grp=reminderGroups[own];
                var contact=CONTACTS[own]||{name:own,email:""};
                var dueLabel=grp.due===1?"Due TOMORROW":"Due in 3 days";
                var dueClr=grp.due===1?"#dc2626":"#d97706";
                var mailto=buildMailtoLink(own,grp.items,grp.due);
                return(
                  <div key={own} style={{border:"1px solid #e2e8f0",borderRadius:6,marginBottom:10,overflow:"hidden"}}>
                    <div style={{background:"#f8fafc",padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <span style={{fontWeight:"bold",fontSize:"12px",color:DARK}}>{contact.name}</span>
                        <span style={{marginLeft:8,fontSize:"10px",color:"#64748b"}}>{contact.email||"no email on file"}</span>
                        <span style={{marginLeft:8,fontSize:"10px",fontWeight:"bold",color:dueClr}}>{dueLabel}</span>
                      </div>
                      {contact.email?(
                        <a href={mailto} style={{fontSize:"11px",padding:"3px 10px",borderRadius:3,border:"1px solid "+GRS_RED,color:"#fff",background:GRS_RED,cursor:"pointer",textDecoration:"none",fontWeight:"bold"}}>
                          Draft in Outlook
                        </a>
                      ):(
                        <span style={{fontSize:"10px",color:"#dc2626"}}>No email</span>
                      )}
                    </div>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:"10px"}}>
                      <thead>
                        <tr style={{background:GRS_RED,color:"#fff"}}>
                          {["#","Subject","Notes","Decision / Direction","Owner","Target Date"].map(function(h){
                            return <th key={h} style={{padding:"3px 6px",textAlign:"left",fontWeight:"bold"}}>{h}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {grp.items.map(function(it){
                          return(
                            <tr key={it.id} style={{borderBottom:"1px solid #f1f5f9"}}>
                              <td style={{padding:"3px 6px",fontWeight:"bold",color:"#334155"}}>{it.id}</td>
                              <td style={{padding:"3px 6px"}}>{it.subj}</td>
                              <td style={{padding:"3px 6px",color:"#475569",maxWidth:130,whiteSpace:"pre-wrap"}}>{it.notes}</td>
                              <td style={{padding:"3px 6px",color:"#475569",maxWidth:130,whiteSpace:"pre-wrap"}}>{it.dec||"--"}</td>
                              <td style={{padding:"3px 6px",fontWeight:"bold",color:GRS_RED}}>{own}</td>
                              <td style={{padding:"3px 6px",fontWeight:"bold",color:dueClr}}>{fmtD(it.td)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── Version Modal ── */}
      {showVersions&&(
        <div style={modalBg} onClick={function(e){if(e.target===e.currentTarget){setShowVersions(false);setShowSaveAs(false);}}}>
          <div style={modalBox}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <b style={{fontSize:"13px",color:DARK}}>Version Manager</b>
              <button onClick={function(){setShowVersions(false);setShowSaveAs(false);}} style={{background:"none",border:"none",fontSize:"18px",cursor:"pointer",color:"#6b7280"}}>x</button>
            </div>
            {versions.slice().reverse().map(function(v){
              var isAct=v.id===activeId;
              return(
                <div key={v.id} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",borderRadius:5,marginBottom:4,background:isAct?"#fef2f2":"#f8fafc",border:"1px solid "+(isAct?GRS_RED:"#e2e8f0")}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:"bold",fontSize:"12px",color:isAct?GRS_RED:DARK}}>{v.name}</div>
                    <div style={{fontSize:"10px",color:"#94a3b8"}}>Saved: {fmtD(v.ts)} &nbsp;|&nbsp; {v.items.length} items</div>
                  </div>
                  {!isAct&&<button onClick={function(){switchVersion(v.id);}} style={{fontSize:"11px",padding:"2px 8px",borderRadius:3,border:"1px solid "+GRS_RED,color:GRS_RED,background:"#fff",cursor:"pointer"}}>Open</button>}
                  {isAct&&<span style={{fontSize:"10px",color:GRS_RED,fontWeight:"bold"}}>ACTIVE</span>}
                  {versions.length>1&&<button onClick={function(){deleteVersion(v.id);}} style={{fontSize:"11px",padding:"2px 6px",borderRadius:3,border:"1px solid #fca5a5",color:"#dc2626",background:"#fff",cursor:"pointer"}}>Del</button>}
                </div>
              );
            })}
            <div style={{borderTop:"1px solid #e2e8f0",marginTop:12,paddingTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
              <button onClick={newVersion} style={Object.assign({},btnW,{fontSize:"11px"})}>+ New blank version</button>
              <button onClick={function(){setShowSaveAs(true);}} style={Object.assign({},btnW,{fontSize:"11px"})}>Save As (copy current)</button>
            </div>
            {showSaveAs&&(
              <div style={{marginTop:10,display:"flex",gap:6,alignItems:"center"}}>
                <input value={saveAsName} onChange={function(e){setSaveAsName(e.target.value);}} placeholder={"e.g. MOM-009 ("+fmtD(gToday())+")"} style={{flex:1,border:"1px solid #d1d5db",borderRadius:3,padding:"3px 6px",fontSize:"11px"}}/>
                <button onClick={doSaveAs} style={Object.assign({},btnW,{background:GRS_RED,color:"#fff",fontSize:"11px"})}>Save</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Top bar ── */}
      <div style={{background:GRS_RED,color:"#fff",padding:"7px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div>
          <div style={{fontWeight:"bold",fontSize:"13px"}}>BLI-GRS-ACLE Site Meetings MoM</div>
          <div style={{fontSize:"10px",opacity:0.85}}>Blindcreek Solar Farm &amp; BESS</div>
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
          <button style={btnW} onClick={save}>Save</button>
          <button style={Object.assign({},btnW,{background:"#fde8ea"})} onClick={function(){setShowVersions(true);}}>Versions</button>
          <button style={btnW} onClick={function(){var html=buildPrint(doc,atts,displayed);var w=window.open("","_blank");if(!w){pop("Enable popups");return;}w.document.write(html);w.document.close();setTimeout(function(){w.print();},600);}}>Print PDF</button>
          <button onClick={function(){setShowReminders(true);}}
            style={Object.assign({},btnW,reminderCount>0?{background:"#fef3c7",color:"#92400e",borderColor:"#fcd34d"}:{})}>
            Reminders{reminderCount>0?" ("+reminderCount+")":""}
          </button>
          <button style={Object.assign({},btnW,{background:"#fef3c7",color:"#92400e",borderColor:"#fcd34d"})} onClick={function(){newItem(null);}}>+ Add Item</button>
          <button title={headerCollapsed?"Expand header":"Collapse header"} onClick={function(){setHeaderCollapsed(function(s){return !s;});}}
            style={{background:"#fff",color:GRS_RED,border:"1px solid #e2b4b7",borderRadius:4,padding:"3px 8px",fontSize:"13px",cursor:"pointer"}}>
            {headerCollapsed?"▼":"▲"}
          </button>
          <button style={Object.assign({},btnW,{background:"#374151",color:"#fff",borderColor:"#374151"})} onClick={doReset} title="Reset all attendees to N">Reset</button>
        </div>
      </div>

      {/* ── Collapsible header ── */}
      {!headerCollapsed&&(
        <div>
          <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"5px 12px",display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"}}>
            <span style={{fontSize:"11px",color:"#64748b"}}>Last print: <b style={{color:"#334155"}}>BLI-GRS-ACL-MOM-{p3(doc.num-1)}</b></span>
            <span style={{fontSize:"11px",color:"#64748b"}}>This Document: <b style={{color:GRS_RED,fontSize:"13px"}}>BLI-GRS-ACL-MOM-{p3(doc.num)}</b></span>
            <span style={{fontSize:"11px",color:"#94a3b8"}}>Doc#<input type="number" value={doc.num} onChange={function(e){setDoc(function(d){return Object.assign({},d,{num:+e.target.value});});}} style={{width:44,border:"1px solid #d1d5db",borderRadius:3,padding:"1px 4px",fontSize:"11px",marginLeft:4,textAlign:"center"}}/></span>
            <span style={{fontSize:"11px",color:"#94a3b8"}}>Meeting<input type="date" value={doc.meet} onChange={function(e){setDoc(function(d){return Object.assign({},d,{meet:e.target.value});});}} style={{border:"1px solid #d1d5db",borderRadius:3,padding:"1px 4px",fontSize:"11px",marginLeft:4}}/></span>
            <span style={{fontSize:"11px",color:"#94a3b8",marginLeft:"auto"}}>Version: <b style={{color:GRS_RED}}>{active.name}</b></span>
            <span style={{fontSize:"11px",color:"#64748b"}}>Today: <b>{fmtD(today)}</b></span>
          </div>
          <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"4px 14px",display:"flex",gap:14,fontSize:"11px",alignItems:"center",flexWrap:"wrap"}}>
            <span style={{color:"#64748b"}}>{items.length} items ({displayed.length} shown)</span>
            <span style={{color:"#dc2626",fontWeight:"bold"}}>{items.filter(function(i){return i.stat==="Open";}).length} Open</span>
            <span style={{color:"#16a34a",fontWeight:"bold"}}>{items.filter(function(i){return i.stat==="Closed";}).length} Closed</span>
            <span style={{color:"#1d4ed8"}}>{items.filter(function(i){return i.act==="Yes";}).length} w/ actions</span>
            {overdue>0&&<span style={{color:"#dc2626",fontWeight:"bold"}}>{overdue} overdue</span>}
            <button onClick={function(){setShowA(function(s){return !s;});}} style={{marginLeft:"auto",background:"none",border:"1px solid #d1d5db",borderRadius:3,cursor:"pointer",fontSize:"11px",color:"#475569",padding:"1px 8px"}}>
              Attendees ({atts.filter(function(a){return a.p;}).length}/{atts.length}) {showA?"^":"v"}
            </button>
          </div>
          {showA&&(
            <div style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"6px 14px",display:"flex",flexWrap:"wrap",gap:4}}>
              {atts.map(function(a,i){
                return <button key={i} onClick={function(){togA(i);}} title={a.n}
                  style={{padding:"2px 8px",borderRadius:3,fontSize:"11px",cursor:"pointer",border:"1px solid "+(a.p?"#86efac":"#fca5a5"),background:a.p?"#f0fdf4":"#fff5f5",color:a.p?"#166534":"#991b1b"}}>
                  <b>{a.i}</b> <span style={{opacity:0.6,fontSize:"10px"}}>{a.c}</span> {a.p?"Y":"N"}
                </button>;
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Filters ── */}
      <div style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0",padding:"5px 14px",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:"11px",color:"#64748b",fontWeight:"bold"}}>Filter:</span>
        {[{k:"disc",label:"Discipline",opts:DISCS},{k:"stat",label:"Status",opts:STATS},{k:"pri",label:"Priority",opts:PRIS},{k:"resp",label:"Responsible",opts:RESPS}].map(function(f){
          return <select key={f.k} value={filters[f.k]} onChange={function(e){setFilters(function(s){return Object.assign({},s,{[f.k]:e.target.value});});}} style={fltSt}>
            <option value="">All {f.label}</option>
            {f.opts.map(function(o){return <option key={o} value={o}>{o}</option>;})}
          </select>;
        })}
        {(filters.disc||filters.stat||filters.pri||filters.resp)&&(
          <button onClick={function(){setFilters({disc:"",stat:"",pri:"",resp:""});setSortCol(null);}} style={{fontSize:"11px",color:GRS_RED,background:"none",border:"1px solid #e2b4b7",borderRadius:3,padding:"2px 8px",cursor:"pointer"}}>Clear</button>
        )}
      </div>

      {/* ── Table ── */}
      <div style={{padding:"0 8px 8px",overflowX:"scroll",overflowY:"auto",maxHeight:headerCollapsed?"calc(100vh - 92px)":"calc(100vh - 192px)"}}>
        <table style={{borderCollapse:"collapse",minWidth:1820,fontSize:"11px",width:"100%",background:"#fff"}}>
          <thead>
            <tr>
              <th style={thSt} onClick={function(){toggleSort("id");}}>#{sa("id")}</th>
              <th style={thSt} onClick={function(){toggleSort("disc");}}>Discipline{sa("disc")}</th>
              <th style={thSt} onClick={function(){toggleSort("subj");}}>Subject{sa("subj")}</th>
              <th style={thSt} onClick={function(){toggleSort("resp");}}>Resp{sa("resp")}</th>
              <th style={thSt} onClick={function(){toggleSort("stat");}}>Status{sa("stat")}</th>
              <th style={thSt} onClick={function(){toggleSort("pri");}}>Priority{sa("pri")}</th>
              <th style={thNS}>Current Meeting Notes</th>
              <th style={thNS}>Decision / Direction</th>
              <th style={thSt} onClick={function(){toggleSort("act");}}>Act?{sa("act")}</th>
              <th style={thSt} onClick={function(){toggleSort("own");}}>Owner{sa("own")}</th>
              <th style={thSt} onClick={function(){toggleSort("dr");}}>Date Raised{sa("dr")}</th>
              <th style={thSt} onClick={function(){toggleSort("td");}}>Target Date{sa("td")}</th>
              <th style={thNS}>Age</th>
              <th style={thNS}>Due</th>
              <th style={Object.assign({},thNS,{width:46})}>...</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map(function(it){
              var isNew=it.dr===today;
              var age=(it.act==="Yes"&&it.dr)?ddiff(today,it.dr):null;
              var due=(it.act==="Yes"&&it.td)?ddiff(it.td,today):null;
              return(
                <tr key={it.id} style={{background:isNew?"#fefce8":"#fff",borderBottom:"1px solid #e2e8f0"}}>
                  <td style={Object.assign({},tdSt,{textAlign:"center",fontWeight:"bold",color:"#334155",minWidth:28})}>
                    {it.id}{isNew&&<div style={{color:"#d97706",fontSize:"9px"}}>NEW</div>}
                  </td>
                  <td style={tdSt}><select value={it.disc} onChange={function(e){upd(it.id,"disc",e.target.value);}} style={Object.assign({},selSt,{width:106})}>{DISCS.map(function(d){return <option key={d}>{d}</option>;})}</select></td>
                  <td style={tdSt}><input value={it.subj} onChange={function(e){upd(it.id,"subj",e.target.value);}} style={Object.assign({},inSt,{width:145})}/></td>
                  <td style={Object.assign({},tdSt,{fontWeight:"bold",color:respColor(it.resp)})}>
                    <select value={it.resp} onChange={function(e){upd(it.id,"resp",e.target.value);}} style={Object.assign({},selSt,{fontWeight:"bold",color:respColor(it.resp)})}>{RESPS.map(function(r){return <option key={r}>{r}</option>;})}</select>
                  </td>
                  <td style={Object.assign({},tdSt,{fontWeight:"bold",color:statColor(it.stat)})}>
                    <select value={it.stat} onChange={function(e){upd(it.id,"stat",e.target.value);}} style={Object.assign({},selSt,{fontWeight:"bold",color:statColor(it.stat)})}>{STATS.map(function(s){return <option key={s}>{s}</option>;})}</select>
                  </td>
                  <td style={Object.assign({},tdSt,{color:priColor(it.pri),fontWeight:it.pri==="High"?"bold":"normal"})}>
                    <select value={it.pri} onChange={function(e){upd(it.id,"pri",e.target.value);}} style={Object.assign({},selSt,{color:priColor(it.pri),fontWeight:it.pri==="High"?"bold":"normal"})}>{PRIS.map(function(p){return <option key={p}>{p}</option>;})}</select>
                  </td>
                  <td style={Object.assign({},tdSt,{minWidth:260})}><textarea value={it.notes} onChange={function(e){upd(it.id,"notes",e.target.value);}} style={Object.assign({},taSt,{minWidth:258})}/></td>
                  <td style={Object.assign({},tdSt,{minWidth:195})}><textarea value={it.dec} onChange={function(e){upd(it.id,"dec",e.target.value);}} style={Object.assign({},taSt,{minWidth:193})}/></td>
                  <td style={Object.assign({},tdSt,{textAlign:"center",fontWeight:"bold",color:it.act==="Yes"?"#16a34a":"#6b7280"})}>
                    <select value={it.act} onChange={function(e){upd(it.id,"act",e.target.value);}} style={Object.assign({},selSt,{fontWeight:"bold",color:it.act==="Yes"?"#16a34a":"#6b7280"})}><option>Yes</option><option>No</option></select>
                  </td>
                  <td style={Object.assign({},tdSt,{textAlign:"center"})}>
                    <select value={it.own} onChange={function(e){upd(it.id,"own",e.target.value);}} disabled={it.act!=="Yes"} style={Object.assign({},selSt,{fontWeight:"bold",color:it.act==="Yes"?"#1d4ed8":"#9ca3af",cursor:it.act!=="Yes"?"not-allowed":"pointer"})}>{INIS.map(function(o){return <option key={o}>{o}</option>;})}</select>
                  </td>
                  <td style={tdSt}><input type="date" value={it.dr} onChange={function(e){upd(it.id,"dr",e.target.value);}} style={Object.assign({},inSt,{width:108,fontSize:"10px"})}/></td>
                  <td style={tdSt}><input type="date" value={it.td} onChange={function(e){upd(it.id,"td",e.target.value);}} disabled={it.act!=="Yes"} style={Object.assign({},inSt,{width:108,fontSize:"10px",opacity:it.act!=="Yes"?0.4:1,cursor:it.act!=="Yes"?"not-allowed":"pointer"})}/></td>
                  <td style={Object.assign({},tdSt,{textAlign:"center",color:"#64748b",minWidth:28})}>{age!=null?age:"--"}</td>
                  <td style={Object.assign({},tdSt,{textAlign:"center",fontWeight:"bold",minWidth:30,color:due!=null?dueColor(due):"#9ca3af"})}>{due!=null?due:"--"}</td>
                  <td style={Object.assign({},tdSt,{textAlign:"center",whiteSpace:"nowrap"})}>
                    <button title="Insert row below" onClick={function(){newItem(it.id);}} style={{background:"none",border:"none",cursor:"pointer",color:"#16a34a",fontSize:"15px",fontWeight:"bold",padding:"0 2px"}}>+</button>
                    <button title="Delete row" onClick={function(){del(it.id);}} style={{background:"none",border:"none",cursor:"pointer",color:"#dc2626",fontSize:"15px",fontWeight:"bold",padding:"0 2px"}}>x</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{marginTop:6,fontSize:"10px",color:"#94a3b8"}}>
          Click headers to sort. Drag bottom-right of Notes/Decision cells to expand. Status: <span style={{color:"#dc2626"}}>Open</span> / <span style={{color:"#16a34a"}}>Closed</span>. Due: <span style={{color:"#dc2626"}}>overdue</span> / <span style={{color:"#d97706"}}>3 days</span> / <span style={{color:"#16a34a"}}>ok</span>.
        </div>
      </div>
    </div>
  );
}
