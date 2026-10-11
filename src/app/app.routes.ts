import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { LoginComponent } from './features/login/login/login.component';
import { RegisterComponent } from './features/register/register/register.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { NotFoundComponent } from './features/notFound/not-found/not-found.component';
import { authGuard } from './core/guards/auth-guard';
import { alreadyloggedGuard } from './core/guards/alreadylogged-guard';

export const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'',component:AuthlayoutComponent,canActivate:[alreadyloggedGuard],children:[

    {path:'login',component:LoginComponent,title:'Route | login'},
    {path:'register',component:RegisterComponent,title:'Route | register'},
  ]},
  {path:'',canActivate:[authGuard],component:MainlayoutComponent,children:[
    
    {path:'feeds',loadComponent:()=>import('./features/feeds/feeds/feeds.component').then((c)=>c.FeedsComponent), title:'Route | feeds'},
    {path:'profile',loadComponent:()=>import('./features/profile/profile/profile.component').then((c)=>c.ProfileComponent), title:'Route | profile'},
    {path:'notifications',loadComponent:()=>import('./features/notification/notification/notification.component').then((c)=>c.NotificationComponent), title:'Route | notification'},
  ]},
  {path:'**',component:NotFoundComponent,title:'error'}
];
