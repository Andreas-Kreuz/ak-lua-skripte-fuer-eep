import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { SwitchesComponent } from './eep/switches/switch-list/switches.component';
import { ConnectingLayoutComponent } from './layouts/connecting-layout.component';
import { MainComponent } from './core/main/main.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: ConnectingLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        component: MainComponent,
        // These Children do all have the main menu bar
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full' },
          {
            path: 'signals',
            loadChildren: () => import('./eep/signals/signals.module').then((m) => m.SignalsModule),
          },
          {
            path: 'trains',
            loadChildren: () => import('./eep/trains/trains.module').then((m) => m.TrainsModule),
          },
          {
            path: 'intersections',
            loadChildren: () => import('./eep/intersection/intersection.module').then((m) => m.IntersectionModule),
          },
          {
            path: 'data',
            loadChildren: () => import('./eep/data/eep-data.module').then((m) => m.EepDataModule),
          },
          {
            path: 'generic-data',
            loadChildren: () => import('./eep/generic-data/generic-data.module').then((m) => m.GenericDataModule),
          },
          {
            path: 'log',
            loadChildren: () => import('./eep/log-viewer/log-viewer.module').then((m) => m.LogViewerModule),
            data: { title: 'Log-Datei' },
          },
          {
            path: 'ui',
            loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule),
          },
          { path: 'switches', component: SwitchesComponent },
        ],
      },
      {
        path: 'server',
        loadChildren: () => import('./server/server.module').then((m) => m.ServerModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
  // { path: '**', redirectTo: '/' }, // Must be the last route!
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
