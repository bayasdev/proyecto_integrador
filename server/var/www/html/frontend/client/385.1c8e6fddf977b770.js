"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[385],{9385:(T,c,u)=>{u.r(c),u.d(c,{RequestsPageModule:()=>A});var a=u(9808),d=u(1816),e=u(1223),g=u(2290),l=u(7562),q=u(9854),i=u(1196);function p(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"button",13),e.NdJ("click",function(){e.CHM(t);const r=e.oxw().$implicit;return e.oxw().delete_request(r.id)}),e._uU(1,"\n                            "),e._UZ(2,"i",14),e._uU(3,"\n                        "),e.qZA()}}const _=function(){return["/request-viewer"]},m=function(n){return{id:n}};function h(n,o){if(1&n&&(e.TgZ(0,"tr"),e._uU(1,"\n                "),e.TgZ(2,"th",8),e._uU(3),e.qZA(),e._uU(4,"\n                "),e.TgZ(5,"td"),e._uU(6),e.qZA(),e._uU(7,"\n                "),e.TgZ(8,"td"),e._uU(9),e.qZA(),e._uU(10,"\n                "),e.TgZ(11,"td"),e._uU(12),e.qZA(),e._uU(13,"\n                "),e.TgZ(14,"td"),e._uU(15),e.qZA(),e._uU(16,"\n                "),e.TgZ(17,"td"),e._uU(18,"\n                    "),e.TgZ(19,"div",9),e._uU(20,"\n                        "),e.TgZ(21,"a",10),e._uU(22,"\n                            "),e._UZ(23,"i",11),e._uU(24,"\n                        "),e.qZA(),e._uU(25,"\n                        "),e.YNc(26,p,4,0,"button",12),e._uU(27,"\n                    "),e.qZA(),e._uU(28,"\n                "),e.qZA(),e._uU(29,"\n            "),e.qZA()),2&n){const t=o.$implicit,s=e.oxw();e.xp6(3),e.Oqu(t.id),e.xp6(3),e.Oqu(t.student_name),e.xp6(3),e.Oqu(t.career_name),e.xp6(3),e.Oqu(s.request_types[t.request_type-1].name),e.xp6(3),e.Oqu(s.request_statuses[t.request_status-1].name),e.xp6(6),e.Q6J("routerLink",e.DdM(8,_))("queryParams",e.VKq(9,m,t.id)),e.xp6(5),e.Q6J("ngIf",1==s.user.role)}}const U=[{path:"",component:(()=>{class n{constructor(t,s,r){this.toastr=t,this.spinner=s,this.requestDataService=r,this.user={},this.requests=[],this.request_types=[{id:1,name:"Modificaci\xf3n de Carga Acad\xe9mica"},{id:2,name:"Retiro en Asignatura"}],this.request_statuses=[{id:1,name:"Pago Pendiente"},{id:2,name:"Pago Aprobado"},{id:3,name:"Pago Rechazado"},{id:4,name:"Aprobado por Director"},{id:5,name:"Rechazado por Director"},{id:6,name:"Aprobado por Decano"},{id:7,name:"Rechazado por Decano"}]}ngOnInit(){const t=sessionStorage.getItem("token");this.user=(0,d.Z)(t),this.refresh()}refresh(){this.get_requests()}get_requests(){this.spinner.show(),this.requests=[],this.requestDataService.get().then(t=>{this.spinner.hide(),this.requests=t}).catch(t=>{console.log(t)})}delete_request(t){this.spinner.show(),this.requests=[],this.requestDataService.delete(t).then(s=>{this.spinner.hide(),this.toastr.success("Solciitud eliminada correctamente.","Solciitud Eliminada"),this.refresh()}).catch(s=>{console.log(s)})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g._W),e.Y36(l.t2),e.Y36(q.s))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-requests-page"]],decls:43,vars:1,consts:[[1,"display-5","mb-5"],[1,"table-responsive","mb-5"],[1,"table","table-bordered","table-hover"],[1,"table-light"],["scope","col"],[4,"ngFor","ngForOf"],["type","button",1,"btn","btn-primary","mb-5",3,"click"],[1,"fas","fa-redo"],["scope","row"],[1,"d-grid","gap-2","d-md-block"],[1,"btn","btn-primary",3,"routerLink","queryParams"],[1,"fas","fa-eye"],["type","button","class","btn btn-danger",3,"click",4,"ngIf"],["type","button",1,"btn","btn-danger",3,"click"],[1,"fas","fa-trash"]],template:function(t,s){1&t&&(e.TgZ(0,"h1",0),e._uU(1,"Todas las Solicitudes"),e.qZA(),e._uU(2,"\n"),e.TgZ(3,"div",1),e._uU(4,"\n    "),e.TgZ(5,"table",2),e._uU(6,"\n        "),e.TgZ(7,"thead",3),e._uU(8,"\n            "),e.TgZ(9,"tr"),e._uU(10,"\n                "),e.TgZ(11,"th",4),e._uU(12,"ID"),e.qZA(),e._uU(13,"\n                "),e.TgZ(14,"th",4),e._uU(15,"Estudiante"),e.qZA(),e._uU(16,"\n                "),e.TgZ(17,"th",4),e._uU(18,"Carrera"),e.qZA(),e._uU(19,"\n                "),e.TgZ(20,"th",4),e._uU(21,"Tipo"),e.qZA(),e._uU(22,"\n                "),e.TgZ(23,"th",4),e._uU(24,"Status"),e.qZA(),e._uU(25,"\n                "),e.TgZ(26,"th",4),e._uU(27,"Acciones"),e.qZA(),e._uU(28,"\n            "),e.qZA(),e._uU(29,"\n        "),e.qZA(),e._uU(30,"\n        "),e.TgZ(31,"tbody"),e._uU(32,"\n            "),e.YNc(33,h,30,11,"tr",5),e._uU(34,"\n        "),e.qZA(),e._uU(35,"\n    "),e.qZA(),e._uU(36,"\n"),e.qZA(),e._uU(37,"\n"),e.TgZ(38,"button",6),e.NdJ("click",function(){return s.refresh()}),e._uU(39,"\n    "),e._UZ(40,"i",7),e._uU(41," Refrescar\n"),e.qZA(),e._uU(42,"\n")),2&t&&(e.xp6(33),e.Q6J("ngForOf",s.requests))},directives:[a.sg,i.yS,a.O5],styles:[""]}),n})()}];let Z=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[i.Bz.forChild(U)],i.Bz]}),n})();var f=u(2382);let A=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[],imports:[[a.ez,Z,f.u5]]}),n})()}}]);