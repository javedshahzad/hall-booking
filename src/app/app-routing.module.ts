import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'plan-an-event',
    loadChildren: () => import('./Pages/plan-an-event/plan-an-event.module').then( m => m.PlanAnEventPageModule)
  },
  {
    path: 'venue-spaces',
    loadChildren: () => import('./Pages/venue-spaces/venue-spaces.module').then( m => m.VenueSpacesPageModule)
  },
  {
    path: 'precinct-map',
    loadChildren: () => import('./Pages/precinct-map/precinct-map.module').then( m => m.PrecinctMapPageModule)
  },
  {
    path: 'upcoming-events',
    loadChildren: () => import('./Pages/upcoming-events/upcoming-events.module').then( m => m.UpcomingEventsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Pages/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'create-hall',
    loadChildren: () => import('./Pages/admin/create-hall/create-hall.module').then( m => m.CreateHallPageModule)
  },
  {
    path: 'view-hall',
    loadChildren: () => import('./Pages/view-hall/view-hall.module').then( m => m.ViewHallPageModule)
  },
  {
    path: 'my-reservations',
    loadChildren: () => import('./Pages/my-reservations/my-reservations.module').then( m => m.MyReservationsPageModule)
  },
  {
    path: 'reservation-requests',
    loadChildren: () => import('./Pages/admin/reservation-requests/reservation-requests.module').then( m => m.ReservationRequestsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./Pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chats-clients',
    loadChildren: () => import('./Pages/admin/chats-clients/chats-clients.module').then( m => m.ChatsClientsPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./Pages/admin/clients/clients.module').then( m => m.ClientsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
