import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users/users.component";
import { DetailsComponent } from "./details/details.component";
import { PostsComponent } from "./posts/posts.component";
import { SettingsComponent } from "./settings/settings.component";	
import { RegisterComponent } from "./register/register.component";
import { PostComponent } from "./post/post.component";
import { HomeComponent } from "./home/home.component";


const routes: Routes = [
	{
	path: "",
	component: HomeComponent
	},
	{
	path: "home",
	component: UsersComponent
	},
	{
	path: "details/:id",
	component: DetailsComponent
	},
	{
	path: "posts",
	component: PostsComponent
	},
	{
	path: 'settings',
	component: SettingsComponent
	},
	{
	path: 'register',
	component: RegisterComponent
	},
	{
	path: "post/:id",
	component: PostComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
