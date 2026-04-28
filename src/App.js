import React, { useState, useMemo } from "react";

const GRS_RED = "#972D35";
const DARK    = "#1e293b";
const STORAGE_KEY = "bli_mom_v1";

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
  {id:5,disc:"Construction",subj:"Trackers survey & Data Design",resp:"ACLE",stat:"Open",pri:"High",notes:"Survey: Field 65.64%, ACLE 62.19%, GRE 32.29%. Design 8 full blocks ahead of workflow. Priority blocks 31-49 incl. north B20-30 south. ACLE tracking grass in surveyed areas, GRS requests mowing support.",dec:"",act:"No",own:"--",dr:"2026-01-21",td:""},
  {id:9,disc:"Quality",subj:"Piles Bent in Delivery",resp:"GRS",stat:"Open",pri:"Low",notes:"Report from ACLE following PVH criteria is pending.",dec:"ACLE to update damaged quantities.",act:"Yes",own:"KJ",dr:"2026-03-06",td:"2026-04-23"},
  {id:10,disc:"Construction",subj:"Piling works",resp:"GRS",stat:"Open",pri:"High",notes:"Production: 18%, approx. 700 piles/day with 7-8 machines, DCB and COMBOX along with tracker piles.",dec:"",act:"No",own:"--",dr:"2026-03-06",td:""},
  {id:13,disc:"Logistics",subj:"Progress Summary",resp:"GRS",stat:"Open",pri:"Low",notes:"Warehouse: PVH 86, Tongwei 71. Deliveries Tue-Fri 12 trucks/day, Sat 6 trucks modules. Unloading: Piles/MS/SD/Controllers 100%, Tubes 20%, Panel Rails 43.48%, Modules 12%.",dec:"",act:"No",own:"--",dr:"2026-01-21",td:""},
  {id:15,disc:"Construction",subj:"Work Flow",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"Surveying: A1, A2NE, Blocks 41-45, 58-61, 76-77, 85-87, 80. Piling: 75->62->57S->50S->51N->57N->31->49. Structure: ACLE to start tracker install next week. Earthworks: B62, B51 done, 41-44 current, 46 next.",dec:"",act:"No",own:"--",dr:"2026-03-06",td:""},
  {id:16,disc:"General",subj:"Project Documentation",resp:"GRS",stat:"Open",pri:"Low",notes:"GRS to share Module sorting maps via transmittal once updated with next batches of flash test data.",dec:"",act:"Yes",own:"JC",dr:"2026-03-06",td:"2026-05-01"},
  {id:21,disc:"Quality",subj:"Galvanization Manufacturing issue",resp:"GRS/ACLE",stat:"Open",pri:"Low",notes:"Block 84 inspection: 45 piles to fix (8% total, 14% north, 6% south). Awaiting PVH zinc content confirmation. Criteria: uncoated above top hole/scratches = ACLE. Within PVH catalog = GRS punch list.",dec:"",act:"Yes",own:"JC",dr:"2026-03-06",td:"2026-04-30"},
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

function gToday() { return new Date().toISOString().split("T")[0]; }
function ddiff(a,b) { if(!a||!b) return null; return Math.round((new Date(a)-new Date(b))/864e5); }
function fmtD(d) { if(!d) return "--"; var p=d.split("-"); return p[2]+"-"+p[1]+"-"+p[0].slice(2); }
function p3(n) { return String(n).padStart(3,"0"); }
function respColor(r) { return (r==="GRS"||r==="GRS/ACLE") ? GRS_RED : "#1e293b"; }

function loadState() {
  try { var r=localStorage.getItem(STORAGE_KEY); return r?JSON.parse(r):null; } catch(e){return null;}
}
function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify(s)); } catch(e){}
}
function clearState() {
  try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
}

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
    var rc=respColor(it.resp);
    return "<tr style='border-bottom:1px solid #e2e8f0'>"
      +"<td align='center'><b>"+it.id+"</b></td><td>"+it.disc+"</td><td>"+it.subj+"</td>"
      +"<td align='center' style='color:"+rc+";font-weight:bold'>"+it.resp+"</td>"
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

export default function App() {
  var saved=loadState();
  var [doc,setDoc]     = useState(saved&&saved.doc   ? saved.doc   : {num:8,meet:"2026-04-24",issue:"2026-04-24"});
  var [atts,setAtts]   = useState(saved&&saved.atts  ? saved.atts  : ATTS_D);
  var [items,setItems] = useState(saved&&saved.items ? saved.items : IMS_D);
  var [nxtId,setNxtId] = useState(saved&&saved.nxtId ? saved.nxtId : 55);
  var [showA,setShowA] = useState(false);
  var [toast,setToast] = useState("");
  var [sortCol,setSortCol] = useState(null);
  var [sortDir,setSortDir] = useState("asc");
  var [filters,setFilters] = useState({disc:"",stat:"",pri:"",resp:""});

  function pop(msg){setToast(msg);setTimeout(function(){setToast("");},2500);}

  function save(){saveState({doc,atts,items,nxtId});pop("Saved");}

  function doReset(){
    setDoc({num:8,meet:"2026-04-24",issue:"2026-04-24"});
    setAtts(ATTS_D);setItems(IMS_D);setNxtId(55);
    setSortCol(null);setFilters({disc:"",stat:"",pri:"",resp:""});
    clearState();pop("Reset to MOM-007 defaults");
  }

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

  function sa(c){return sortCol===c?(sortDir==="asc"?" ^":" v"):"";}
  function statColor(s){return s==="Open"?"#dc2626":"#16a34a";}
  function priColor(p){return p==="High"?"#dc2626":p==="Medium"?"#d97706":"#6b7280";}
  function dueColor(d){return d<0?"#dc2626":d<=3?"#d97706":"#16a34a";}

  return (
    <div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"Calibri,sans-serif",fontSize:"12px"}}>

      {toast&&<div style={{position:"fixed",top:10,right:10,zIndex:999,background:DARK,color:"#fff",fontSize:"12px",padding:"6px 14px",borderRadius:5}}>{toast}</div>}

      <div style={{background:GRS_RED,color:"#fff",padding:"7px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50}}>
        <div>
          <div style={{fontWeight:"bold",fontSize:"13px"}}>BLI-GRS-ACLE Site Meetings MoM</div>
          <div style={{fontSize:"10px",opacity:0.85}}>Blindcreek Solar Farm &amp; BESS</div>
        </div>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
          <button style={btnW} onClick={save}>Save</button>
          <button style={btnW} onClick={function(){var html=buildPrint(doc,atts,displayed);var w=window.open("","_blank");if(!w){pop("Enable popups");return;}w.document.write(html);w.document.close();setTimeout(function(){w.print();},600);}}>Print PDF</button>
          <button style={btnW} onClick={function(){var s="BLI-GRS-ACL-EML-0016-MoM - Weekly Meetings";var b="Hi all,\n\nPlease find attached MoM from last meeting, and review if you have any action on your name and complete by target date.\n\nThank you and looking forward to meeting you again.\n\nKind regards";window.open("mailto:jcespedes@gransolar.com?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(b));}}>Email</button>
          <button style={Object.assign({},btnW,{background:"#fef3c7",color:"#92400e",borderColor:"#fcd34d"})} onClick={function(){newItem(null);}}>+ Add Item</button>
          <button style={Object.assign({},btnW,{background:"#374151",color:"#fff",borderColor:"#374151"})} onClick={doReset}>Reset</button>
        </div>
      </div>

      <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"5px 12px",display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"}}>
        <span style={{fontSize:"11px",color:"#64748b"}}>Last print: <b style={{color:"#334155"}}>BLI-GRS-ACL-MOM-{p3(doc.num-1)}</b></span>
        <span style={{fontSize:"11px",color:"#64748b"}}>This Document: <b style={{color:GRS_RED,fontSize:"13px"}}>BLI-GRS-ACL-MOM-{p3(doc.num)}</b></span>
        <span style={{fontSize:"11px",color:"#94a3b8"}}>Doc#
          <input type="number" value={doc.num} onChange={function(e){setDoc(function(d){return Object.assign({},d,{num:+e.target.value});});}} style={{width:44,border:"1px solid #d1d5db",borderRadius:3,padding:"1px 4px",fontSize:"11px",marginLeft:4,textAlign:"center"}}/>
        </span>
        <span style={{fontSize:"11px",color:"#94a3b8"}}>Meeting
          <input type="date" value={doc.meet} onChange={function(e){setDoc(function(d){return Object.assign({},d,{meet:e.target.value});});}} style={{border:"1px solid #d1d5db",borderRadius:3,padding:"1px 4px",fontSize:"11px",marginLeft:4}}/>
        </span>
        <span style={{marginLeft:"auto",fontSize:"11px",color:"#64748b"}}>Today: <b>{fmtD(today)}</b></span>
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

      <div style={{padding:"0 8px 8px",overflowX:"scroll",overflowY:"auto",maxHeight:"calc(100vh - 192px)"}}>
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
              return (
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
