"use strict";(self.webpackChunkangular_quiz_maker=self.webpackChunkangular_quiz_maker||[]).push([[45],{7045:(f,_,o)=>{o.r(_),o.d(_,{AnswersPageComponent:()=>O});var i=o(6814),c=o(5195),g=o(2557),u=o(2296),m=o(9422),e=o(5879),p=o(5180);const d=function(t,s){return{"failed-btn":t,"pass-btn":s}};function h(t,s){if(1&t&&(e.TgZ(0,"mat-chip",7),e._uU(1),e.ALo(2,"decode"),e.qZA()),2&t){const r=s.$implicit;e.Q6J("ngClass",e.WLB(4,d,!0===r.chosen&&!1===r.answer,!0===r.answer)),e.xp6(1),e.hij(" ",e.lcZ(2,2,r.question)," ")}}function C(t,s){if(1&t&&(e.TgZ(0,"li")(1,"mat-card",5)(2,"mat-card-header"),e._uU(3),e.ALo(4,"decode"),e.qZA(),e.TgZ(5,"mat-card-content")(6,"mat-chip-listbox"),e.YNc(7,h,3,7,"mat-chip",6),e.qZA()()()()),2&t){const r=s.$implicit,a=e.oxw();e.xp6(3),e.hij(" ",e.lcZ(4,3,r.title)," "),e.xp6(4),e.Q6J("ngForOf",r.questions)("ngForTrackBy",a.trackByList)}}const P=function(t,s,r){return{failed:t,average:s,pass:r}};let O=(()=>{var t;class s{constructor(a,n){this.actRoute=a,this.router=n,this.completeList=[],this.score=0}ngOnInit(){this.routeSub$=this.actRoute.queryParamMap.subscribe(a=>{this.completeList=JSON.parse(a.get("questions")),this.completeList.forEach(n=>{n.questions.forEach(l=>{l.chosen&&l.answer&&this.score++})})})}ngOnDestroy(){this.routeSub$?.unsubscribe()}trackByCompleteList(a,n){return n}trackByList(a,n){return n}restart(){this.router.navigate(["/home"])}}return(t=s).\u0275fac=function(a){return new(a||t)(e.Y36(p.gz),e.Y36(p.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-answers-page"]],standalone:!0,features:[e.jDz],decls:14,vars:9,consts:[["lang","en"],["charset","utf-8"],[3,"ngClass"],[4,"ngFor","ngForOf","ngForTrackBy"],["mat-button","","color","accent",3,"click"],[1,"card"],["class","btn",3,"ngClass",4,"ngFor","ngForOf","ngForTrackBy"],[1,"btn",3,"ngClass"]],template:function(a,n){1&a&&(e.TgZ(0,"html",0)(1,"head"),e._UZ(2,"meta",1),e.TgZ(3,"title"),e._uU(4,"Answer Page"),e.qZA()(),e.TgZ(5,"body")(6,"h2"),e._uU(7,"Results"),e.qZA(),e.TgZ(8,"div",2),e._uU(9),e.qZA(),e.TgZ(10,"ol"),e.YNc(11,C,8,5,"li",3),e.TgZ(12,"button",4),e.NdJ("click",function(){return n.restart()}),e._uU(13,"Create a new quiz"),e.qZA()()()()),2&a&&(e.xp6(8),e.Q6J("ngClass",e.kEZ(5,P,2>n.score,4>n.score&&n.score>=2,n.score>3)),e.xp6(1),e.AsE(" You scored: (",n.score," / ",n.completeList.length,") "),e.xp6(2),e.Q6J("ngForOf",n.completeList)("ngForTrackBy",n.trackByCompleteList))},dependencies:[i.ez,i.mk,i.sg,c.QW,c.a8,c.dn,c.dk,g.Hi,g.HS,g.z2,m.$,u.ot,u.lW],styles:[".average[_ngcontent-%COMP%]{color:#b6b607}.btn[_ngcontent-%COMP%]{border:groove;border-radius:25px;padding:0% 1%;margin:0% 1%}.card[_ngcontent-%COMP%]{margin:2% 0%}.failed[_ngcontent-%COMP%]{color:red}.failed-btn[_ngcontent-%COMP%]{background-color:red;border:groove;border-radius:25px;padding:0% 1%;margin:0% 1%}.pass[_ngcontent-%COMP%]{color:green}.pass-btn[_ngcontent-%COMP%]{background-color:green;border:groove;border-radius:25px;padding:0% 1%;margin:0% 1%}"]}),s})()}}]);