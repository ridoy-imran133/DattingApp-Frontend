import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";
import { ListsComponent } from "src/app/lists/lists.component";
import { MemberDetailComponent } from "src/app/members/member-detail/member-detail.component";
import { MemberEditComponent } from "src/app/members/member-edit/member-edit.component";
import { MemberListComponent } from "src/app/members/member-list/member-list.component";
import { MessagesComponent } from "src/app/messages/messages.component";
import { AuthGuard } from "src/app/_guards/auth.guard";
import { PreventUnsavedChangesGuard } from "src/app/_guards/prevent-unsaved-changes.guard";

export const appRoutes : Routes= [
    {path: '', component: HomeComponent},
    {path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members/:id', component: MemberDetailComponent },
            {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
            {path: 'messages', component: MessagesComponent },
            {path: 'lists', component: ListsComponent },
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
]