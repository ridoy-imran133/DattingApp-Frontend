import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";
import { ListsComponent } from "src/app/lists/lists.component";
import { MemberListComponent } from "src/app/members/member-list/member-list.component";
import { MessagesComponent } from "src/app/messages/messages.component";
import { AuthGuard } from "src/app/_guards/auth.guard";

export const appRoutes : Routes= [
    {path: '', component: HomeComponent},
    {path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'messages', component: MessagesComponent },
            {path: 'lists', component: ListsComponent },
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
]