/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Actor {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  actor_id: number;

  /** @format character varying */
  first_name: string;

  /** @format character varying */
  last_name: string;

  /** @format timestamp without time zone */
  last_update: string;

  /** @format character varying */
  fullname?: string;
}

export interface ActorInfo {
  /** @format integer */
  actor_id?: number;

  /** @format character varying */
  first_name?: string;

  /** @format character varying */
  last_name?: string;

  /** @format text */
  film_info?: string;
}

export interface Address {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  address_id: number;

  /** @format character varying */
  address: string;

  /** @format character varying */
  address2?: string;

  /** @format character varying */
  district: string;

  /**
   * Note:
   * This is a Foreign Key to `city.city_id`.<fk table='city' column='city_id'/>
   * @format smallint
   */
  city_id: number;

  /** @format character varying */
  postal_code?: string;

  /** @format character varying */
  phone: string;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface Category {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  category_id: number;

  /** @format character varying */
  name: string;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface City {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  city_id: number;

  /** @format character varying */
  city: string;

  /**
   * Note:
   * This is a Foreign Key to `country.country_id`.<fk table='country' column='country_id'/>
   * @format smallint
   */
  country_id: number;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface Country {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  country_id: number;

  /** @format character varying */
  country: string;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface Customer {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  customer_id: number;

  /** @format smallint */
  store_id: number;

  /** @format character varying */
  first_name: string;

  /** @format character varying */
  last_name: string;

  /** @format character varying */
  email?: string;

  /**
   * Note:
   * This is a Foreign Key to `address.address_id`.<fk table='address' column='address_id'/>
   * @format smallint
   */
  address_id: number;

  /** @format boolean */
  activebool: boolean;

  /** @format date */
  create_date: string;

  /** @format timestamp without time zone */
  last_update?: string;

  /** @format integer */
  active?: number;
}

export interface CustomerList {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  id?: number;

  /** @format text */
  name?: string;

  /** @format character varying */
  address?: string;

  /** @format character varying */
  "zip code"?: string;

  /** @format character varying */
  phone?: string;

  /** @format character varying */
  city?: string;

  /** @format character varying */
  country?: string;

  /** @format text */
  notes?: string;

  /** @format smallint */
  sid?: number;
}

export interface Film {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  film_id: number;

  /**
   * 名称
   * @format character varying
   */
  title: string;

  /** @format text */
  description?: string;

  /**
   * 发布年份
   * @format integer
   */
  release_year?: number;

  /**
   * Note:
   * This is a Foreign Key to `language.language_id`.<fk table='language' column='language_id'/>
   * @format smallint
   */
  language_id: number;

  /** @format smallint */
  rental_duration: number;

  /** @format numeric */
  rental_rate: number;

  /** @format smallint */
  length?: number;

  /** @format numeric */
  replacement_cost: number;

  /** @format public.mpaa_rating */
  rating?: "G" | "PG" | "PG-13" | "R" | "NC-17";

  /** @format timestamp without time zone */
  last_update: string;

  /** @format ARRAY */
  special_features?: string;

  /** @format tsvector */
  fulltext: string;
}

export interface FilmActor {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * This is a Foreign Key to `actor.actor_id`.<fk table='actor' column='actor_id'/>
   * @format smallint
   */
  actor_id: number;

  /**
   * Note:
   * This is a Primary Key.<pk/>
   * This is a Foreign Key to `film.film_id`.<fk table='film' column='film_id'/>
   * @format smallint
   */
  film_id: number;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface FilmCategory {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * This is a Foreign Key to `film.film_id`.<fk table='film' column='film_id'/>
   * @format smallint
   */
  film_id: number;

  /**
   * Note:
   * This is a Primary Key.<pk/>
   * This is a Foreign Key to `category.category_id`.<fk table='category' column='category_id'/>
   * @format smallint
   */
  category_id: number;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface FilmList {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  fid?: number;

  /** @format character varying */
  title?: string;

  /** @format text */
  description?: string;

  /** @format character varying */
  category?: string;

  /** @format numeric */
  price?: number;

  /** @format smallint */
  length?: number;

  /** @format public.mpaa_rating */
  rating?: "G" | "PG" | "PG-13" | "R" | "NC-17";

  /** @format text */
  actors?: string;
}

export interface Inventory {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  inventory_id: number;

  /**
   * Note:
   * This is a Foreign Key to `film.film_id`.<fk table='film' column='film_id'/>
   * @format smallint
   */
  film_id: number;

  /**
   * Note:
   * This is a Foreign Key to `store.store_id`.<fk table='store' column='store_id'/>
   * @format smallint
   */
  store_id: number;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface Language {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  language_id: number;

  /** @format character */
  name: string;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface NicerButSlowerFilmList {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  fid?: number;

  /** @format character varying */
  title?: string;

  /** @format text */
  description?: string;

  /** @format character varying */
  category?: string;

  /** @format numeric */
  price?: number;

  /** @format smallint */
  length?: number;

  /** @format public.mpaa_rating */
  rating?: "G" | "PG" | "PG-13" | "R" | "NC-17";

  /** @format text */
  actors?: string;
}

export interface Payment {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  payment_id: number;

  /**
   * Note:
   * This is a Foreign Key to `customer.customer_id`.<fk table='customer' column='customer_id'/>
   * @format smallint
   */
  customer_id: number;

  /**
   * Note:
   * This is a Foreign Key to `staff.staff_id`.<fk table='staff' column='staff_id'/>
   * @format smallint
   */
  staff_id: number;

  /**
   * Note:
   * This is a Foreign Key to `rental.rental_id`.<fk table='rental' column='rental_id'/>
   * @format integer
   */
  rental_id: number;

  /** @format numeric */
  amount: number;

  /** @format timestamp without time zone */
  payment_date: string;
}

export interface Rental {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  rental_id: number;

  /** @format timestamp without time zone */
  rental_date: string;

  /**
   * Note:
   * This is a Foreign Key to `inventory.inventory_id`.<fk table='inventory' column='inventory_id'/>
   * @format integer
   */
  inventory_id: number;

  /**
   * Note:
   * This is a Foreign Key to `customer.customer_id`.<fk table='customer' column='customer_id'/>
   * @format smallint
   */
  customer_id: number;

  /** @format timestamp without time zone */
  return_date?: string;

  /**
   * Note:
   * This is a Foreign Key to `staff.staff_id`.<fk table='staff' column='staff_id'/>
   * @format smallint
   */
  staff_id: number;

  /** @format timestamp without time zone */
  last_update: string;
}

export interface SalesByFilmCategory {
  /** @format character varying */
  category?: string;

  /** @format numeric */
  total_sales?: number;
}

export interface SalesByStore {
  /** @format text */
  store?: string;

  /** @format text */
  manager?: string;

  /** @format numeric */
  total_sales?: number;
}

export interface Staff {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  staff_id: number;

  /** @format character varying */
  first_name: string;

  /** @format character varying */
  last_name: string;

  /**
   * Note:
   * This is a Foreign Key to `address.address_id`.<fk table='address' column='address_id'/>
   * @format smallint
   */
  address_id: number;

  /** @format character varying */
  email?: string;

  /** @format smallint */
  store_id: number;

  /** @format boolean */
  active: boolean;

  /** @format character varying */
  username: string;

  /** @format character varying */
  password?: string;

  /** @format timestamp without time zone */
  last_update: string;

  /** @format bytea */
  picture?: string;
}

export interface StaffList {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  id?: number;

  /** @format text */
  name?: string;

  /** @format character varying */
  address?: string;

  /** @format character varying */
  "zip code"?: string;

  /** @format character varying */
  phone?: string;

  /** @format character varying */
  city?: string;

  /** @format character varying */
  country?: string;

  /** @format smallint */
  sid?: number;
}

export interface Store {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   * @format integer
   */
  store_id: number;

  /**
   * Note:
   * This is a Foreign Key to `staff.staff_id`.<fk table='staff' column='staff_id'/>
   * @format smallint
   */
  manager_staff_id: number;

  /**
   * Note:
   * This is a Foreign Key to `address.address_id`.<fk table='address' column='address_id'/>
   * @format smallint
   */
  address_id: number;

  /** @format timestamp without time zone */
  last_update: string;
}
