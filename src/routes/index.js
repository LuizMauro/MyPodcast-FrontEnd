import React from 'react';
import { Switch, Route } from 'react-router-dom';

//Rotas
import PrivateRouteADM from './PrivateRouteADM';
import PrivateRouteMOD from './PrivateRouteMOD';
import PrivateRoutePOD from './PrivateRoutePod';
import PrivateRoutePremium from './PrivateRoutePremium';
import PrivateRoute from './PrivateRoute';

//PAGES
//Geral
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Pesquisar from '../pages/Pesquisar';
import NotFound404 from '../pages/NotFound';
import PodCast from '../pages/Podcast';
import ForgotPassword from '../pages/ForgotPassword';
import Mapa from '../pages/Mapa';

//Usuario
import Profile from '../pages/Profile';

//Podcaster
import PodcasterPodcasts from '../pages/DashboardPodcaster/Podcast/Listar/index';
import PodcasterCadastrarPodcast from '../pages/DashboardPodcaster/Podcast/Cadastrar/index'
import PodcasterAssinarPremium from '../pages/DashboardPodcaster/AssinarPremium/'

//Podcater Premium
import PremiumPodcasts from '../pages/DashboardPremium/Podcast/Listar';
import PremiumCadastrarPodcast from '../pages/DashboardPremium/Podcast/Cadastrar';
import PremiumDesempenho from '../pages/DashboardPremium/Desempenho';
import PremiumAssinatura from '../pages/DashboardPremium/Assinatura';

//Moderador
import ModPodcast from '../pages/DashboardMod/Podcast';
import ModCategoria from '../pages/DashboardMod/Categoria/Listar';
import ModCadastrarCategoria from '../pages/DashboardMod/Categoria/Cadastrar';
import ModSolicitacao from '../pages/DashboardMod/Solicitacao';
import ModUsuario from '../pages/DashboardMod/Usuario';

//ADM
import Dashboard from '../pages/Dashboard/Home';
import PodcastAdmCadastrar from '../pages/Dashboard/Podcast/Cadastrar';
import PodcastAdm from '../pages/Dashboard/Podcast/Listar';
import CategoriasAdm from '../pages/Dashboard/Categoria/Listar';
import CategoriasAdmCadastrar from '../pages/Dashboard/Categoria/Cadastrar';
import SolicitacoesAdm from '../pages/Dashboard/Solicitacao';
import UsuariosAdm from '../pages/Dashboard/Usuario';
import ModeradoresAdm from '../pages/DashboardMod/Podcast';
import PublicidadeAdm from '../pages/Dashboard/Publicidade/Listar';
import PublicidadeAdmCadastrar from '../pages/Dashboard/Publicidade/Cadastrar';
import RelatorioAdm from '../pages/Dashboard/Relatorio';
import PlanoAdm from '../pages/Dashboard/Planos';

//Imports CSS
import '../assets/css/argon-design-system-react.css';
import '../assets/css/custom.css';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/Cadastro" component={Cadastro} />
			<Route path="/Login" component={Login} />
			<Route path="/Cadastro" component={Cadastro} />
			<Route path="/forgot_password" component={ForgotPassword} />
			<Route path="/Pesquisar/" component={Pesquisar} />
			<Route path="/Podcast/:pod_id" component={PodCast} />
			<Route path="/Sitemap" component={Mapa} />

			{/* Usuario */}
			<PrivateRoute path="/Profile" component={Profile} />

			{/* MOD */}
			<PrivateRouteMOD path="/mod/dashboard" exact component={ModPodcast} />
			<PrivateRouteMOD path="/mod/dashboard/categorias" exact component={ModCategoria} />
			<PrivateRouteMOD path="/mod/dashboard/categorias/cadastrar" exact component={ModCadastrarCategoria} />
			<PrivateRouteMOD path="/mod/dashboard/usuarios" exact component={ModUsuario} />
			<PrivateRouteMOD path="/mod/dashboard/solicitacoes" exact component={ModSolicitacao} />

			{/* PODCASTER  */}
			<PrivateRoutePOD
				path="/podcaster/dashboard/podcasts"
				exact
				component={PodcasterPodcasts}
			/>
			<PrivateRoutePOD
				path="/podcaster/dashboard/podcasts/cadastrar"
				exact
				component={PodcasterCadastrarPodcast}
			/>
			<PrivateRoutePOD
				path="/podcaster/dashboard/assinar"
				exact
				component={PodcasterAssinarPremium}
			/>

			{/* Podcaster Premium */}
			<PrivateRoutePremium
				path="/podcaster/premium/dashboard/podcasts"
				exact
				component={PremiumPodcasts}
			/>
			<PrivateRoutePremium
				path="/podcaster/premium/dashboard/podcasts/cadastrar"
				exact
				component={PremiumCadastrarPodcast}
			/>
			<PrivateRoutePremium
				path="/podcaster/premium/dashboard/desempenho"
				exact
				component={PremiumDesempenho}
			/>
			<PrivateRoutePremium
				path="/podcaster/premium/dashboard/assinatura"
				exact
				component={PremiumAssinatura}	
			/>

			{/* ADM */}
			<PrivateRouteADM
				path="/adm/dashboard/categorias"
				exact
				component={CategoriasAdm}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/categorias/cadastrar"
				exact
				component={CategoriasAdmCadastrar}
			/>
			<PrivateRouteADM exact path="/adm/dashboard" exact component={Dashboard} />
			
			<PrivateRouteADM
				path="/adm/dashboard/usuarios"
				exact
				component={UsuariosAdm}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/podcasts/cadastrar"
				exact
				component={PodcastAdmCadastrar}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/podcasts/"
				exact
				component={PodcastAdm}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/solicitacoes"
				exact
				component={SolicitacoesAdm}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/moderadores"
				exact
				component={ModeradoresAdm}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/publicidade"
				exact
				component={PublicidadeAdm}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/publicidade/cadastrar"
				exact
				component={PublicidadeAdmCadastrar}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/plano"
				exact
				component={PlanoAdm}
			/>
			<PrivateRouteADM
				path="/adm/dashboard/relatorio"
				exact
				component={RelatorioAdm}
			/>

			<Route path="/" component={NotFound404} />
			<Route path="/error" exact component={NotFound404} />
		</Switch>
	);
}
