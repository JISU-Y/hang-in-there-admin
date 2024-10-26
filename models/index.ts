export interface GetLoginDto {
  id: string;
  pw: string;
}

export interface LoginType {
  at: string;
  rt: string;
  id: string;
  name: string;
}

export interface CreateMemberDto {
  id: string;
  pw: string;
  name: string;
}

export interface MemberDto {
  id: string;
  name: string;
  join_dt: string;
  member_id: string;
}
