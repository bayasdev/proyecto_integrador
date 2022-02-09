'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageModule.html" data-type="entity-link" >ActiveRequestsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e"' : 'data-target="#xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e"' :
                                            'id="xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e"' }>
                                            <li class="link">
                                                <a href="components/ActiveRequestsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActiveRequestsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageModule.html" data-type="entity-link" >ActiveRequestsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-1"' : 'data-target="#xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-1"' :
                                            'id="xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-1"' }>
                                            <li class="link">
                                                <a href="components/ActiveRequestsPageComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActiveRequestsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageModule.html" data-type="entity-link" >ActiveRequestsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-2"' : 'data-target="#xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-2"' :
                                            'id="xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-2"' }>
                                            <li class="link">
                                                <a href="components/ActiveRequestsPageComponent-2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActiveRequestsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageModule.html" data-type="entity-link" >ActiveRequestsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-3"' : 'data-target="#xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-3"' :
                                            'id="xs-components-links-module-ActiveRequestsPageModule-5fdfafdffd528caedd1bb2519030759b569cbc6647850bc025763070e46fead97aa28bc92c957abec4c64ab42503c4e1bf4f7d3991663bcb13c153396e05826e-3"' }>
                                            <li class="link">
                                                <a href="components/ActiveRequestsPageComponent-3.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActiveRequestsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageRoutingModule.html" data-type="entity-link" >ActiveRequestsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageRoutingModule.html" data-type="entity-link" >ActiveRequestsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageRoutingModule.html" data-type="entity-link" >ActiveRequestsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ActiveRequestsPageRoutingModule.html" data-type="entity-link" >ActiveRequestsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-44e6b6ebdcb9589c0613179bcb25bb61d702557e3508b7111b4902123ac0115a1997e2bf0a3c5aa769c02232ba4b93713e1ddae0d94a6e3e2b59aa4d4e428545"' : 'data-target="#xs-components-links-module-AppModule-44e6b6ebdcb9589c0613179bcb25bb61d702557e3508b7111b4902123ac0115a1997e2bf0a3c5aa769c02232ba4b93713e1ddae0d94a6e3e2b59aa4d4e428545"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-44e6b6ebdcb9589c0613179bcb25bb61d702557e3508b7111b4902123ac0115a1997e2bf0a3c5aa769c02232ba4b93713e1ddae0d94a6e3e2b59aa4d4e428545"' :
                                            'id="xs-components-links-module-AppModule-44e6b6ebdcb9589c0613179bcb25bb61d702557e3508b7111b4902123ac0115a1997e2bf0a3c5aa769c02232ba4b93713e1ddae0d94a6e3e2b59aa4d4e428545"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BlankPageModule.html" data-type="entity-link" >BlankPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BlankPageModule-650ae8823ddcb39d3bca4fd7e71d8ab5d417c0e181b2084319acefc10acc7dc4056d1bf95d0ff12a348269a2002c64e36ac88bf401721b5db1ae22e4463d16d6"' : 'data-target="#xs-components-links-module-BlankPageModule-650ae8823ddcb39d3bca4fd7e71d8ab5d417c0e181b2084319acefc10acc7dc4056d1bf95d0ff12a348269a2002c64e36ac88bf401721b5db1ae22e4463d16d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlankPageModule-650ae8823ddcb39d3bca4fd7e71d8ab5d417c0e181b2084319acefc10acc7dc4056d1bf95d0ff12a348269a2002c64e36ac88bf401721b5db1ae22e4463d16d6"' :
                                            'id="xs-components-links-module-BlankPageModule-650ae8823ddcb39d3bca4fd7e71d8ab5d417c0e181b2084319acefc10acc7dc4056d1bf95d0ff12a348269a2002c64e36ac88bf401721b5db1ae22e4463d16d6"' }>
                                            <li class="link">
                                                <a href="components/BlankPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlankPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlankPageRoutingModule.html" data-type="entity-link" >BlankPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CareersPageModule.html" data-type="entity-link" >CareersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CareersPageModule-50b47416a9e3ca9baa34e83a048992387186d8929d0ccacf204bf5d4df2b4c6fd322d08a746db34b129ac467ec6dbbd7fc19419fe8b0b76ec6bde60dfff5ed6e"' : 'data-target="#xs-components-links-module-CareersPageModule-50b47416a9e3ca9baa34e83a048992387186d8929d0ccacf204bf5d4df2b4c6fd322d08a746db34b129ac467ec6dbbd7fc19419fe8b0b76ec6bde60dfff5ed6e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CareersPageModule-50b47416a9e3ca9baa34e83a048992387186d8929d0ccacf204bf5d4df2b4c6fd322d08a746db34b129ac467ec6dbbd7fc19419fe8b0b76ec6bde60dfff5ed6e"' :
                                            'id="xs-components-links-module-CareersPageModule-50b47416a9e3ca9baa34e83a048992387186d8929d0ccacf204bf5d4df2b4c6fd322d08a746db34b129ac467ec6dbbd7fc19419fe8b0b76ec6bde60dfff5ed6e"' }>
                                            <li class="link">
                                                <a href="components/CareersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CareersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CareersPageRoutingModule.html" data-type="entity-link" >CareersPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardPageModule.html" data-type="entity-link" >DashboardPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardPageModule-e0855d24d04074889dffe805681743349824ffc561dd3b139ff5a7fb4df5b7995259d887f99a7d30a58f5c5398404db2e3f926c7e5d5127f47042fae945b84d4"' : 'data-target="#xs-components-links-module-DashboardPageModule-e0855d24d04074889dffe805681743349824ffc561dd3b139ff5a7fb4df5b7995259d887f99a7d30a58f5c5398404db2e3f926c7e5d5127f47042fae945b84d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardPageModule-e0855d24d04074889dffe805681743349824ffc561dd3b139ff5a7fb4df5b7995259d887f99a7d30a58f5c5398404db2e3f926c7e5d5127f47042fae945b84d4"' :
                                            'id="xs-components-links-module-DashboardPageModule-e0855d24d04074889dffe805681743349824ffc561dd3b139ff5a7fb4df5b7995259d887f99a7d30a58f5c5398404db2e3f926c7e5d5127f47042fae945b84d4"' }>
                                            <li class="link">
                                                <a href="components/DashboardPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardPageRoutingModule.html" data-type="entity-link" >DashboardPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DeniedPageModule.html" data-type="entity-link" >DeniedPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DeniedPageModule-d315700eef4dc985782d2fc3a49a5fb999211efe1238d53909de762d371e320b6c2e5fd30ece68827c4134df39cda0ac1365ae556cd10764f1ebdaa63cb25b90"' : 'data-target="#xs-components-links-module-DeniedPageModule-d315700eef4dc985782d2fc3a49a5fb999211efe1238d53909de762d371e320b6c2e5fd30ece68827c4134df39cda0ac1365ae556cd10764f1ebdaa63cb25b90"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DeniedPageModule-d315700eef4dc985782d2fc3a49a5fb999211efe1238d53909de762d371e320b6c2e5fd30ece68827c4134df39cda0ac1365ae556cd10764f1ebdaa63cb25b90"' :
                                            'id="xs-components-links-module-DeniedPageModule-d315700eef4dc985782d2fc3a49a5fb999211efe1238d53909de762d371e320b6c2e5fd30ece68827c4134df39cda0ac1365ae556cd10764f1ebdaa63cb25b90"' }>
                                            <li class="link">
                                                <a href="components/DeniedPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeniedPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeniedPageRoutingModule.html" data-type="entity-link" >DeniedPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FacultiesPageModule.html" data-type="entity-link" >FacultiesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FacultiesPageModule-f45345361eb51fbcf27994ca523d0387dabff0be47c14037f94819f04986a625ea2aa16b8b13e29df3432c446760f21ef44098dc2d5ded64ebd2d99f28cf60c8"' : 'data-target="#xs-components-links-module-FacultiesPageModule-f45345361eb51fbcf27994ca523d0387dabff0be47c14037f94819f04986a625ea2aa16b8b13e29df3432c446760f21ef44098dc2d5ded64ebd2d99f28cf60c8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FacultiesPageModule-f45345361eb51fbcf27994ca523d0387dabff0be47c14037f94819f04986a625ea2aa16b8b13e29df3432c446760f21ef44098dc2d5ded64ebd2d99f28cf60c8"' :
                                            'id="xs-components-links-module-FacultiesPageModule-f45345361eb51fbcf27994ca523d0387dabff0be47c14037f94819f04986a625ea2aa16b8b13e29df3432c446760f21ef44098dc2d5ded64ebd2d99f28cf60c8"' }>
                                            <li class="link">
                                                <a href="components/FacultiesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacultiesPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FacultiesPageRoutingModule.html" data-type="entity-link" >FacultiesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link" >LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LayoutModule-ddbff22adfedcbb3dec03417b17213bec195a48a26d07f5c060e30824980325bacf7317b29f8711e340c3682f9fa33766ff05420ad122f578fbe26536ef4b97e"' : 'data-target="#xs-components-links-module-LayoutModule-ddbff22adfedcbb3dec03417b17213bec195a48a26d07f5c060e30824980325bacf7317b29f8711e340c3682f9fa33766ff05420ad122f578fbe26536ef4b97e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-ddbff22adfedcbb3dec03417b17213bec195a48a26d07f5c060e30824980325bacf7317b29f8711e340c3682f9fa33766ff05420ad122f578fbe26536ef4b97e"' :
                                            'id="xs-components-links-module-LayoutModule-ddbff22adfedcbb3dec03417b17213bec195a48a26d07f5c060e30824980325bacf7317b29f8711e340c3682f9fa33766ff05420ad122f578fbe26536ef4b97e"' }>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutRoutingModule.html" data-type="entity-link" >LayoutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' : 'data-target="#xs-components-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' :
                                            'id="xs-components-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordRecoveryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordRecoveryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' : 'data-target="#xs-injectables-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' :
                                        'id="xs-injectables-links-module-LoginPageModule-61b596468833807a89db43b19d739c2e13034cadc3cb5f1e75a73d54269e9da5064ed8aff0504cf4ee1e3c02d960f5dd0f8a79c4d7ae4506d498724ce9e4695e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MyRequestsPageModule.html" data-type="entity-link" >MyRequestsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MyRequestsPageModule-e4b0945bcd4ef4dc927be47d46f438d2c34a852b9b7074f199e601458f427cc1b63282f0fc604a4bf85a82a7d7cd57103c1b5239e244c812f3f755a2a429c703"' : 'data-target="#xs-components-links-module-MyRequestsPageModule-e4b0945bcd4ef4dc927be47d46f438d2c34a852b9b7074f199e601458f427cc1b63282f0fc604a4bf85a82a7d7cd57103c1b5239e244c812f3f755a2a429c703"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MyRequestsPageModule-e4b0945bcd4ef4dc927be47d46f438d2c34a852b9b7074f199e601458f427cc1b63282f0fc604a4bf85a82a7d7cd57103c1b5239e244c812f3f755a2a429c703"' :
                                            'id="xs-components-links-module-MyRequestsPageModule-e4b0945bcd4ef4dc927be47d46f438d2c34a852b9b7074f199e601458f427cc1b63282f0fc604a4bf85a82a7d7cd57103c1b5239e244c812f3f755a2a429c703"' }>
                                            <li class="link">
                                                <a href="components/MyRequestsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MyRequestsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MyRequestsPageRoutingModule.html" data-type="entity-link" >MyRequestsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewRequestPageModule.html" data-type="entity-link" >NewRequestPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewRequestPageModule-9ecc0ec3b0ea379cb82468cd34c986186cf93f34bb560bb818b800b2b39de85ba81482fdda28cea285377a005b013527007a28b409e1d1e203f91c7cf1ba4037"' : 'data-target="#xs-components-links-module-NewRequestPageModule-9ecc0ec3b0ea379cb82468cd34c986186cf93f34bb560bb818b800b2b39de85ba81482fdda28cea285377a005b013527007a28b409e1d1e203f91c7cf1ba4037"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewRequestPageModule-9ecc0ec3b0ea379cb82468cd34c986186cf93f34bb560bb818b800b2b39de85ba81482fdda28cea285377a005b013527007a28b409e1d1e203f91c7cf1ba4037"' :
                                            'id="xs-components-links-module-NewRequestPageModule-9ecc0ec3b0ea379cb82468cd34c986186cf93f34bb560bb818b800b2b39de85ba81482fdda28cea285377a005b013527007a28b409e1d1e203f91c7cf1ba4037"' }>
                                            <li class="link">
                                                <a href="components/NewRequestPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewRequestPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewRequestPageRoutingModule.html" data-type="entity-link" >NewRequestPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundPageModule.html" data-type="entity-link" >NotFoundPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotFoundPageModule-16b601f19918aac008024a06ed82418b43ebad47ed00d8b7e875e52ee45a671d818fbdce2a776712b3e66e863c642ccecf0a54fc66f878ec1c9440bb154e61a2"' : 'data-target="#xs-components-links-module-NotFoundPageModule-16b601f19918aac008024a06ed82418b43ebad47ed00d8b7e875e52ee45a671d818fbdce2a776712b3e66e863c642ccecf0a54fc66f878ec1c9440bb154e61a2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotFoundPageModule-16b601f19918aac008024a06ed82418b43ebad47ed00d8b7e875e52ee45a671d818fbdce2a776712b3e66e863c642ccecf0a54fc66f878ec1c9440bb154e61a2"' :
                                            'id="xs-components-links-module-NotFoundPageModule-16b601f19918aac008024a06ed82418b43ebad47ed00d8b7e875e52ee45a671d818fbdce2a776712b3e66e863c642ccecf0a54fc66f878ec1c9440bb154e61a2"' }>
                                            <li class="link">
                                                <a href="components/NotFoundPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundPageRoutingModule.html" data-type="entity-link" >NotFoundPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordRecoveryPageModule.html" data-type="entity-link" >PasswordRecoveryPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PasswordRecoveryPageModule-36ac085cd05a0c44263b3892209fec3143c573818945866e8eb23b1c3946149adee03ee77f797e3220629bd4da45fd2c9a3c60a17ce5f6559f8e1ff9fac6c287"' : 'data-target="#xs-components-links-module-PasswordRecoveryPageModule-36ac085cd05a0c44263b3892209fec3143c573818945866e8eb23b1c3946149adee03ee77f797e3220629bd4da45fd2c9a3c60a17ce5f6559f8e1ff9fac6c287"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PasswordRecoveryPageModule-36ac085cd05a0c44263b3892209fec3143c573818945866e8eb23b1c3946149adee03ee77f797e3220629bd4da45fd2c9a3c60a17ce5f6559f8e1ff9fac6c287"' :
                                            'id="xs-components-links-module-PasswordRecoveryPageModule-36ac085cd05a0c44263b3892209fec3143c573818945866e8eb23b1c3946149adee03ee77f797e3220629bd4da45fd2c9a3c60a17ce5f6559f8e1ff9fac6c287"' }>
                                            <li class="link">
                                                <a href="components/PasswordRecoveryPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordRecoveryPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordRecoveryPageRoutingModule.html" data-type="entity-link" >PasswordRecoveryPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' : 'data-target="#xs-components-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' :
                                            'id="xs-components-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' }>
                                            <li class="link">
                                                <a href="components/ProfilePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' : 'data-target="#xs-injectables-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' :
                                        'id="xs-injectables-links-module-ProfilePageModule-a093e1f04b615f57a74ec2268118174190222c10f928d84657acc082f5cc2e8cd1b2b603e47a67c88f1267132b668bdbbdb865fd69d84927b819c6c31368822c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RequestsPageModule.html" data-type="entity-link" >RequestsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RequestsPageModule-6da69bc2a98ae46b60d0ff7249d68681f9c9582f24086be230c343e48fb6a71dfadba1a2b71b13b1b6acb2d1486a6c2672f75f81e6008cd2b0c1c8313f73e6a3"' : 'data-target="#xs-components-links-module-RequestsPageModule-6da69bc2a98ae46b60d0ff7249d68681f9c9582f24086be230c343e48fb6a71dfadba1a2b71b13b1b6acb2d1486a6c2672f75f81e6008cd2b0c1c8313f73e6a3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RequestsPageModule-6da69bc2a98ae46b60d0ff7249d68681f9c9582f24086be230c343e48fb6a71dfadba1a2b71b13b1b6acb2d1486a6c2672f75f81e6008cd2b0c1c8313f73e6a3"' :
                                            'id="xs-components-links-module-RequestsPageModule-6da69bc2a98ae46b60d0ff7249d68681f9c9582f24086be230c343e48fb6a71dfadba1a2b71b13b1b6acb2d1486a6c2672f75f81e6008cd2b0c1c8313f73e6a3"' }>
                                            <li class="link">
                                                <a href="components/RequestsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestsPageRoutingModule.html" data-type="entity-link" >RequestsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RequestViewerPageModule.html" data-type="entity-link" >RequestViewerPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RequestViewerPageModule-ff67dd772ea5d3099025a9562a1d3edd881cd5d0806b4652f460efad0cdfc7c05a83addd1bf24876bbf616d4847bc1a3a649b2e519209458c2b8737db7390e00"' : 'data-target="#xs-components-links-module-RequestViewerPageModule-ff67dd772ea5d3099025a9562a1d3edd881cd5d0806b4652f460efad0cdfc7c05a83addd1bf24876bbf616d4847bc1a3a649b2e519209458c2b8737db7390e00"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RequestViewerPageModule-ff67dd772ea5d3099025a9562a1d3edd881cd5d0806b4652f460efad0cdfc7c05a83addd1bf24876bbf616d4847bc1a3a649b2e519209458c2b8737db7390e00"' :
                                            'id="xs-components-links-module-RequestViewerPageModule-ff67dd772ea5d3099025a9562a1d3edd881cd5d0806b4652f460efad0cdfc7c05a83addd1bf24876bbf616d4847bc1a3a649b2e519209458c2b8737db7390e00"' }>
                                            <li class="link">
                                                <a href="components/RequestViewerPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestViewerPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestViewerPageRoutingModule.html" data-type="entity-link" >RequestViewerPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SubjectsPageModule.html" data-type="entity-link" >SubjectsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SubjectsPageModule-016c5436dd47fcb036baadb55cf015dad899024decff820a51c14c2daa87ad42ac13d04a5fc49fc9ffd04999acc52a072ec045800f6bc98cdc7635d3ebf30b77"' : 'data-target="#xs-components-links-module-SubjectsPageModule-016c5436dd47fcb036baadb55cf015dad899024decff820a51c14c2daa87ad42ac13d04a5fc49fc9ffd04999acc52a072ec045800f6bc98cdc7635d3ebf30b77"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SubjectsPageModule-016c5436dd47fcb036baadb55cf015dad899024decff820a51c14c2daa87ad42ac13d04a5fc49fc9ffd04999acc52a072ec045800f6bc98cdc7635d3ebf30b77"' :
                                            'id="xs-components-links-module-SubjectsPageModule-016c5436dd47fcb036baadb55cf015dad899024decff820a51c14c2daa87ad42ac13d04a5fc49fc9ffd04999acc52a072ec045800f6bc98cdc7635d3ebf30b77"' }>
                                            <li class="link">
                                                <a href="components/SubjectsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubjectsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubjectsPageRoutingModule.html" data-type="entity-link" >SubjectsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersPageModule.html" data-type="entity-link" >UsersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersPageModule-84f728f7aa8d1f42e569cddcb9d75a2b222b7f74bd5ba830374b903f73095796d6a779545eb11e1ecca7f41c94e579a1ef954dd0fd363d26fac9262a303144c1"' : 'data-target="#xs-components-links-module-UsersPageModule-84f728f7aa8d1f42e569cddcb9d75a2b222b7f74bd5ba830374b903f73095796d6a779545eb11e1ecca7f41c94e579a1ef954dd0fd363d26fac9262a303144c1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersPageModule-84f728f7aa8d1f42e569cddcb9d75a2b222b7f74bd5ba830374b903f73095796d6a779545eb11e1ecca7f41c94e579a1ef954dd0fd363d26fac9262a303144c1"' :
                                            'id="xs-components-links-module-UsersPageModule-84f728f7aa8d1f42e569cddcb9d75a2b222b7f74bd5ba830374b903f73095796d6a779545eb11e1ecca7f41c94e579a1ef954dd0fd363d26fac9262a303144c1"' }>
                                            <li class="link">
                                                <a href="components/UsersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersPageRoutingModule.html" data-type="entity-link" >UsersPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CareerService.html" data-type="entity-link" >CareerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeanService.html" data-type="entity-link" >DeanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DirectorService.html" data-type="entity-link" >DirectorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacultyService.html" data-type="entity-link" >FacultyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestAttachmentService.html" data-type="entity-link" >RequestAttachmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link" >RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubjectService.html" data-type="entity-link" >SubjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TotalsService.html" data-type="entity-link" >TotalsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});