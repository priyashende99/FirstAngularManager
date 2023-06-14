import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {
  getTeamMembersSummary(): any[]{
    var TeamMembersSummary = [
      { Region: "East", TeamMemberCount: 20, TemporarilyUnavialableMember: 4 },
      { Region: "West", TeamMemberCount: 15, TemporarilyUnavialableMember: 8 },
      { Region: "South", TeamMemberCount: 17, TemporarilyUnavialableMember: 1 },
      { Region: "North", TeamMemberCount: 15, TemporarilyUnavialableMember: 6 }
    ];
    return TeamMembersSummary;
  }
}
