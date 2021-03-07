/// <reference types="next" />
/// <reference types="next/types/global" />

type UrlModel = {
  _id: string,
  shortId: string,
  url: string,
  createdAt: Date | string
}

type UrlAccessModel = {
  _id: string,
  url: string,
  access: Date | string
}

type UrlCreate = {
  url: string,
}

type UrlCreateResponse = {
  shortId: string,
  url: string,
}

type UrlData = {
  shortId: string,
}

type UrlStatistic = {
  shortId: string,
}

type UrlStatisticResponse = {
  shortId: string,
  count: number
}