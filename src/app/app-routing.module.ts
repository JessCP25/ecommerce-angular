import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then((m) => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules (esto carga todos los modulos no es conveniente cuando hay muchos modulos)
    // preloadingStrategy: CustomPreloadService (esto es con un servicio en especifico)
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
