"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[990],{5990:(S,u,e)=>{e.r(u),e.d(u,{LayoutModule:()=>P});var d=e(9808),s=e(1196),c=e(1816),n=e(1223);let l=(()=>{class t{constructor(o){this.router=o}canActivate(o,i){const r=o.data.expectedRole,R=sessionStorage.getItem("token");return r==(0,c.Z)(R).role||(this.router.navigate(["/denied"]),!1)}canActivateChild(o,i){return this.canActivate(o,i)}}return t.\u0275fac=function(o){return new(o||t)(n.LFG(s.F0))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();const m=function(){return["/dashboard"]},g=function(){return["/profile"]},f=function(){return["active"]};let h=(()=>{class t{constructor(o){this.router=o,this.user={},this.roles=[{id:1,name:"Administrador"},{id:2,name:"Decano"},{id:3,name:"Director de Carrera"},{id:4,name:"Contabilidad"},{id:5,name:"Estudiante"}]}ngOnInit(){}logout(){sessionStorage.clear(),this.router.navigate(["/login"])}}return t.\u0275fac=function(o){return new(o||t)(n.Y36(s.F0))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-navbar"]],inputs:{user:"user"},decls:53,vars:8,consts:[[1,"navbar","navbar-expand-lg","navbar-light","bg-light","fixed-top"],[1,"container-fluid"],["type","button","data-bs-toggle","offcanvas","data-bs-target","#offcanvasMenu","aria-controls","offcanvasMenu","aria-expanded","false","aria-label","Toggle offcanvas",1,"navbar-toggler","me-2"],[1,"fas","fa-bars","barras-navbar"],[3,"routerLink"],["src","assets/img/smcar_logo.svg","height","30"],[1,"navbar-nav","ms-auto"],[1,"nav-item","dropdown"],["href","#","id","navbarDropdown","role","button","data-bs-toggle","dropdown","aria-expanded","false",1,"nav-link","dropdown-toggle"],["src","assets/img/dashboard/avatar.svg","height","30"],[1,"d-lg-inline","d-none"],["aria-labelledby","navbarDropdown",1,"dropdown-menu","dropdown-menu-end","user-dropdown"],[1,"dropdown-item",3,"routerLink","routerLinkActive"],[1,"fas","fa-user-edit"],[1,"dropdown-divider"],[1,"dropdown-item",3,"click"],[1,"fas","fa-sign-out-alt"]],template:function(o,i){1&o&&(n.TgZ(0,"nav",0),n._uU(1,"\n    "),n.TgZ(2,"div",1),n._uU(3,"\n        "),n.TgZ(4,"button",2),n._uU(5,"\n            "),n._UZ(6,"i",3),n._uU(7,"\n        "),n.qZA(),n._uU(8,"\n        "),n.TgZ(9,"a",4),n._uU(10,"\n            "),n._UZ(11,"img",5),n._uU(12,"\n        "),n.qZA(),n._uU(13,"\n        "),n.TgZ(14,"ul",6),n._uU(15,"\n            "),n.TgZ(16,"li",7),n._uU(17,"\n                "),n.TgZ(18,"a",8),n._uU(19,"\n                    "),n._UZ(20,"img",9),n._uU(21,"\n                    "),n.TgZ(22,"span",10),n._uU(23),n.qZA(),n._uU(24,"\n                "),n.qZA(),n._uU(25,"\n                "),n.TgZ(26,"ul",11),n._uU(27,"\n                    "),n.TgZ(28,"li"),n._uU(29,"\n                        "),n.TgZ(30,"a",12),n._uU(31,"\n                            "),n._UZ(32,"i",13),n._uU(33," Editar perfil "),n.qZA(),n._uU(34,"\n                    "),n.qZA(),n._uU(35,"\n                    "),n.TgZ(36,"li"),n._uU(37,"\n                        "),n._UZ(38,"hr",14),n._uU(39,"\n                    "),n.qZA(),n._uU(40,"\n                    "),n.TgZ(41,"li"),n._uU(42,"\n                        "),n.TgZ(43,"a",15),n.NdJ("click",function(){return i.logout()}),n._uU(44,"\n                            "),n._UZ(45,"i",16),n._uU(46," Cerrar sesi\xf3n "),n.qZA(),n._uU(47,"\n                    "),n.qZA(),n._uU(48,"\n                "),n.qZA(),n._uU(49,"\n            "),n.qZA(),n._uU(50,"\n        "),n.qZA(),n._uU(51,"\n    "),n.qZA(),n._uU(52,"\n"),n.qZA()),2&o&&(n.xp6(9),n.Q6J("routerLink",n.DdM(5,m)),n.xp6(14),n.AsE("",i.user.name," (",i.roles[i.user.role-1].name,")"),n.xp6(7),n.Q6J("routerLink",n.DdM(6,g))("routerLinkActive",n.DdM(7,f)))},directives:[s.yS,s.Od],styles:[".user-dropdown[_ngcontent-%COMP%]{position:absolute!important}.navbar-toggler[_ngcontent-%COMP%], .navbar-toggler[_ngcontent-%COMP%]:focus, .navbar-toggler[_ngcontent-%COMP%]:active{outline:none;border:none;box-shadow:none;padding:0;margin:0}.barras-navbar[_ngcontent-%COMP%]{font-size:30px}"]}),t})();const p=function(t){return[t]},v=function(){return["active"]};function U(t,a){if(1&t&&(n.ynx(0),n._uU(1,"\n              "),n.TgZ(2,"a",12),n._uU(3,"\n                "),n._UZ(4,"i"),n._uU(5),n.qZA(),n._uU(6,"\n            "),n.BQk()),2&t){const o=n.oxw().$implicit;n.xp6(2),n.Q6J("routerLink",n.VKq(6,p,o.link))("routerLinkActive",n.DdM(8,v)),n.xp6(2),n.Gre("",o.icon," me-2"),n.xp6(1),n.hij(" ",o.name,"\n              ")}}function C(t,a){if(1&t){const o=n.EpF();n._uU(0,"\n              "),n.TgZ(1,"a",13),n.NdJ("click",function(){return n.CHM(o),n.oxw(4).logout()}),n._uU(2,"\n                "),n._UZ(3,"i"),n._uU(4),n.qZA(),n._uU(5,"\n            ")}if(2&t){const o=n.oxw().$implicit;n.xp6(3),n.Gre("",o.icon," me-2"),n.xp6(1),n.hij(" ",o.name,"\n              ")}}function Z(t,a){if(1&t&&(n.TgZ(0,"li"),n._uU(1,"\n            "),n.YNc(2,U,7,9,"ng-container",10),n._uU(3,"\n            "),n.YNc(4,C,6,4,"ng-template",null,11,n.W1O),n._uU(6,"\n          "),n.qZA()),2&t){const o=a.$implicit,i=n.MAs(5);n.xp6(2),n.Q6J("ngIf","Cerrar sesi\xf3n"!=o.name)("ngIfElse",i)}}function x(t,a){if(1&t&&(n.ynx(0),n._uU(1,"\n          "),n.TgZ(2,"li"),n._uU(3,"\n            "),n.TgZ(4,"div",6),n._uU(5),n.qZA(),n._uU(6,"\n          "),n.qZA(),n._uU(7,"\n          "),n.YNc(8,Z,7,2,"li",7),n._uU(9,"\n          "),n.TgZ(10,"li",8),n._uU(11,"\n            "),n._UZ(12,"hr",9),n._uU(13,"\n          "),n.qZA(),n._uU(14,"\n        "),n.BQk()),2&t){const o=n.oxw().$implicit;n.xp6(5),n.Oqu(o.name),n.xp6(3),n.Q6J("ngForOf",o.items)}}function A(t,a){if(1&t&&(n.TgZ(0,"ul",4),n._uU(1,"\n        "),n.YNc(2,x,15,2,"ng-container",5),n._uU(3,"\n      "),n.qZA()),2&t){const o=a.$implicit,i=n.oxw();n.xp6(2),n.Q6J("ngIf",i.user.role==o.expectedRole||99==o.expectedRole)}}let M=(()=>{class t{constructor(o){this.router=o,this.user={},this.links=[{name:"DASHBOARD",expectedRole:99,items:[{name:"Inicio",icon:"fas fa-home",link:"/dashboard"}]},{name:"SERVICIOS",expectedRole:5,items:[{name:"Crear Solicitud",icon:"fas fa-plus-circle",link:"/student/new-request"}]},{name:"HIST\xd3RICO",expectedRole:5,items:[{name:"Mis Solicitudes",icon:"fas fa-history",link:"/student/requests"}]},{name:"SOLICITUDES",expectedRole:4,items:[{name:"Solicitudes en curso",icon:"fas fa-check",link:"/accountant/requests/active"},{name:"Todas las Solicitudes",icon:"fas fa-history",link:"/accountant/requests"}]},{name:"ADMINISTRACI\xd3N",expectedRole:1,items:[{name:"Usuarios",icon:"fas fa-users-cog",link:"/admin/users"},{name:"Facultades",icon:"fas fa-university",link:"/admin/faculties"},{name:"Carreras",icon:"fas fa-graduation-cap",link:"/admin/careers"},{name:"Materias",icon:"fas fa-book",link:"/admin/subjects"},{name:"Solicitudes",icon:"fas fa-folder-open",link:"/admin/requests"}]},{name:"CUENTA",expectedRole:99,items:[{name:"Editar perfil",icon:"fas fa-user-edit",link:"/profile"},{name:"Cerrar sesi\xf3n",icon:"fas fa-sign-out-alt",link:""}]}]}ngOnInit(){}logout(){sessionStorage.clear(),this.router.navigate(["/login"])}}return t.\u0275fac=function(o){return new(o||t)(n.Y36(s.F0))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-sidebar"]],inputs:{user:"user"},decls:11,vars:1,consts:[["tabindex","-1","id","offcanvasMenu","aria-labelledby","offcanvasMenuLabel",1,"offcanvas","offcanvas-start","bg-dark","text-white","sidebar-nav"],[1,"offcanvas-body","px-0"],[1,"navbar-dark"],["class","navbar-nav",4,"ngFor","ngForOf"],[1,"navbar-nav"],[4,"ngIf"],[1,"text-muted","small","fw-bold","px-3"],[4,"ngFor","ngForOf"],[1,"my-4"],[1,"dropdown-divider"],[4,"ngIf","ngIfElse"],["logOutLink",""],[1,"nav-link","px-3",3,"routerLink","routerLinkActive"],[1,"nav-link","px-3",3,"click"]],template:function(o,i){1&o&&(n._uU(0,"\n\n"),n.TgZ(1,"div",0),n._uU(2,"\n  "),n.TgZ(3,"div",1),n._uU(4,"\n    "),n.TgZ(5,"nav",2),n._uU(6,"\n      "),n.YNc(7,A,4,1,"ul",3),n._uU(8,"\n    "),n.qZA(),n._uU(9,"\n  "),n.qZA(),n._uU(10,"\n"),n.qZA()),2&o&&(n.xp6(7),n.Q6J("ngForOf",i.links))},directives:[d.sg,d.O5,s.yS,s.Od],styles:[".sidebar-nav[_ngcontent-%COMP%]{width:270px}.sidebar-link[_ngcontent-%COMP%]{display:flex;align-items:center}.sidebar-link[_ngcontent-%COMP%]   .right-icon[_ngcontent-%COMP%]{display:inline-flex}.sidebar-link[aria-expanded=true][_ngcontent-%COMP%]   .right-icon[_ngcontent-%COMP%]{transform:rotate(180deg)}@media (min-width: 992px){.sidebar-nav[_ngcontent-%COMP%]{transform:none;visibility:visible!important;height:calc(100% - 62px);top:62px}}"]}),t})();const y=[{path:"",component:(()=>{class t{constructor(){this.user={}}ngOnInit(){const o=sessionStorage.getItem("token");this.user=(0,c.Z)(o)}}return t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-layout"]],decls:11,vars:2,consts:[[3,"user"],[1,"mt-5","pt-5","px-lg-5","px-0"],[1,"container-fluid"]],template:function(o,i){1&o&&(n._UZ(0,"app-navbar",0),n._uU(1,"\n"),n._UZ(2,"app-sidebar",0),n._uU(3,"\n"),n.TgZ(4,"main",1),n._uU(5,"\n  "),n.TgZ(6,"div",2),n._uU(7,"\n    "),n._UZ(8,"router-outlet"),n._uU(9,"\n  "),n.qZA(),n._uU(10,"\n"),n.qZA()),2&o&&(n.Q6J("user",i.user),n.xp6(2),n.Q6J("user",i.user))},directives:[h,M,s.lC],styles:["@media (min-width: 992px){body[_ngcontent-%COMP%]{overflow:auto!important}main[_ngcontent-%COMP%]{margin-left:270px}}"]}),t})(),children:[{path:"dashboard",loadChildren:()=>Promise.all([e.e(382),e.e(393)]).then(e.bind(e,2393)).then(t=>t.DashboardPageModule)},{path:"",redirectTo:"dashboard"},{path:"profile",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(544)]).then(e.bind(e,3544)).then(t=>t.ProfilePageModule)},{path:"request-viewer",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(810)]).then(e.bind(e,6771)).then(t=>t.RequestViewerPageModule)},{path:"student/new-request",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(272)]).then(e.bind(e,2272)).then(t=>t.NewRequestPageModule),canActivate:[l],data:{expectedRole:5}},{path:"student/requests",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(543)]).then(e.bind(e,7543)).then(t=>t.MyRequestsPageModule),canActivate:[l],data:{expectedRole:5}},{path:"accountant/requests",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(385)]).then(e.bind(e,9385)).then(t=>t.RequestsPageModule),canActivate:[l],data:{expectedRole:4}},{path:"admin/users",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(274)]).then(e.bind(e,2274)).then(t=>t.UsersPageModule),canActivate:[l],data:{expectedRole:1}},{path:"admin/faculties",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(672)]).then(e.bind(e,7672)).then(t=>t.FacultiesPageModule),canActivate:[l],data:{expectedRole:1}},{path:"admin/careers",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(479)]).then(e.bind(e,1479)).then(t=>t.CareersPageModule),canActivate:[l],data:{expectedRole:1}},{path:"admin/subjects",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(402)]).then(e.bind(e,402)).then(t=>t.SubjectsPageModule),canActivate:[l],data:{expectedRole:1}},{path:"admin/requests",loadChildren:()=>Promise.all([e.e(382),e.e(592),e.e(385)]).then(e.bind(e,9385)).then(t=>t.RequestsPageModule),canActivate:[l],data:{expectedRole:1}},{path:"denied",loadChildren:()=>Promise.all([e.e(382),e.e(436)]).then(e.bind(e,7436)).then(t=>t.DeniedPageModule)},{path:"not-found",loadChildren:()=>Promise.all([e.e(382),e.e(224)]).then(e.bind(e,4224)).then(t=>t.NotFoundPageModule)},{path:"**",redirectTo:"not-found"}]}];let T=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({providers:[l],imports:[[s.Bz.forChild(y)],s.Bz]}),t})(),P=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({providers:[],imports:[[d.ez,T]]}),t})()}}]);