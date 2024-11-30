import { BannerStatusType, StringBooleanType } from './client';

export type EventStatusType = 'on_going' | 'up_comming' | 'closed';
export type EventListOrderType = 'view_count' | 'title';

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

export interface EventListRequestType {
  page: number;
  size: number;
  title?: string;
  content_type?: string;
  area_cd?: number;
  sigungu_cd?: string;
  category?: string;
  sub_category?: string;
  detail_sub_category?: string;
  status?: EventStatusType;
  order_type?: EventListOrderType;
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

export interface EventDetailType {
  event_id: number;
  content_id: string;
  title: string;
  addr: string;
  addr_detail: string;
  area_cd: number;
  sigungu_cd: number;
  content_type: number;
  category: number;
  sub_category: number;
  detail_sub_category: number;
  tel: string;
  event_st: string;
  event_ed: string;
  map_x: number;
  map_y: number;
  cost_info: string;
  host: string;
  sponsor: string;
  homepage_url: string;
  description: string;
  create_dt: string;
  reg_id: number;
  up_dt: string;
  up_id: number;
  use_yn: StringBooleanType;
  top_yn: StringBooleanType;
  like: number;
  view_count: number;
  ticket_yn: StringBooleanType;
  img: [
    {
      url: string;
      sort_order: number;
    }
  ];
}

export interface GetBannerListRequest {
  page: number;
  size: number;
  useYn?: StringBooleanType;
  status?: BannerStatusType;
}

export interface BannerType {
  banner_id: number;
  bg_image: string | null;
  event_image: string | null;
  content: string | null;
  link: string | null;
  start_dt: string;
  end_dt: string;
  order_number: number | null;
  create_dt: string;
  update_dt: string | null;
  create_id: number;
  update_id: number | null;
  use_yn: StringBooleanType;
}

export interface CreateBannerDto {
  bgImageUrl: string;
  eventImageUrl: string;
  content: string;
  link: string;
  startDate: string;
  endDate: string;
}

export interface UpdateBannerDto {
  bgImageUrl: string;
  eventImageUrl: string;
  content: string;
  link: string;
  startDate: string;
  endDate: string;
  bannerId: number;
}

export interface UpdateBannerUseynDto {
  bannerId: number;
  useYn: StringBooleanType;
}

export interface UpdateBannerOrderDto {
  bannerId: number;
  orderNum: number;
}
