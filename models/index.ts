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

export interface UpdatePasswordDto {
  pw: string;
}

export interface EventListType {
  event_id: number;
  image: string;
  title: string;
  event_st: string;
  event_ed: string;
  content_type: number;
  area_cd: number;
  sigungu_cd: number;
  category: number;
  sub_category: number;
  detail_sub_category: number;
  reg_dt: string;
  addr: string;
  addr_detail: string;
}
