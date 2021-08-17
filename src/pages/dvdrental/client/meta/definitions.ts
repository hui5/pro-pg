import * as types from "./types"

export interface definitions {
  actor: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    actor_id: number
    first_name: string
    last_name: string
    last_update: string
    fullname?: string

    /**
     * join table
     */
    join__film_actor__actor_id: types.FilmActor[]

    joinby__film_actor: types.Film[]
  }

  actor_info: {
    actor_id?: number
    first_name?: string
    last_name?: string
    film_info?: string
  }

  address: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    address_id: number
    address: string
    address2?: string
    district: string
    /**
     * Note:
     * This is a Foreign Key to `city.city_id`.<fk table='city' column='city_id'/>
     */
    city_id: number
    postal_code?: string
    phone: string
    last_update: string

    /**
     * join table
     */
    embed__city_id: types.City

    join__customer__address_id: types.Customer[]

    join__staff__address_id: types.Staff[]

    join__store__address_id: types.Store[]

    joinby__store: types.Staff[]
  }

  category: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    category_id: number
    name: string
    last_update: string

    /**
     * join table
     */
    join__film_category__category_id: types.FilmCategory[]

    joinby__film_category: types.Film[]
  }

  city: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    city_id: number
    city: string
    /**
     * Note:
     * This is a Foreign Key to `country.country_id`.<fk table='country' column='country_id'/>
     */
    country_id: number
    last_update: string

    /**
     * join table
     */
    embed__country_id: types.Country

    join__address__city_id: types.Address[]
  }

  country: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    country_id: number
    country: string
    last_update: string

    /**
     * join table
     */
    join__city__country_id: types.City[]
  }

  customer: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    customer_id: number
    store_id: number
    first_name: string
    last_name: string
    email?: string
    /**
     * Note:
     * This is a Foreign Key to `address.address_id`.<fk table='address' column='address_id'/>
     */
    address_id: number
    activebool: boolean
    create_date: string
    last_update?: string
    active?: number

    /**
     * join table
     */
    embed__address_id: types.Address

    join__payment__customer_id: types.Payment[]

    join__rental__customer_id: types.Rental[]
  }

  customer_list: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id?: number
    name?: string
    address?: string
    "zip code"?: string
    phone?: string
    city?: string
    country?: string
    notes?: string
    sid?: number
  }

  film: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    film_id: number
    title: string
    description?: string
    release_year?: number
    /**
     * Note:
     * This is a Foreign Key to `language.language_id`.<fk table='language' column='language_id'/>
     */
    language_id: number
    rental_duration: number
    rental_rate: number
    length?: number
    replacement_cost: number
    rating?: "G" | "PG" | "PG-13" | "R" | "NC-17"
    last_update: string
    special_features?: string
    fulltext: string

    /**
     * join table
     */
    embed__language_id: types.Language

    join__film_actor__film_id: types.FilmActor[]

    join__film_category__film_id: types.FilmCategory[]

    join__inventory__film_id: types.Inventory[]

    joinby__film_actor: types.Actor[]

    joinby__film_category: types.Category[]

    joinby__inventory: types.Store[]
  }

  film_actor: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `actor.actor_id`.<fk table='actor' column='actor_id'/>
     */
    actor_id: number
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `film.film_id`.<fk table='film' column='film_id'/>
     */
    film_id: number
    last_update: string

    /**
     * join table
     */
    embed__actor_id: types.Actor

    embed__film_id: types.Film
  }

  film_category: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `film.film_id`.<fk table='film' column='film_id'/>
     */
    film_id: number
    /**
     * Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `category.category_id`.<fk table='category' column='category_id'/>
     */
    category_id: number
    last_update: string

    /**
     * join table
     */
    embed__category_id: types.Category

    embed__film_id: types.Film
  }

  film_list: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    fid?: number
    title?: string
    description?: string
    category?: string
    price?: number
    length?: number
    rating?: "G" | "PG" | "PG-13" | "R" | "NC-17"
    actors?: string
  }

  inventory: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    inventory_id: number
    /**
     * Note:
     * This is a Foreign Key to `film.film_id`.<fk table='film' column='film_id'/>
     */
    film_id: number
    /**
     * Note:
     * This is a Foreign Key to `store.store_id`.<fk table='store' column='store_id'/>
     */
    store_id: number
    last_update: string

    /**
     * join table
     */
    embed__film_id: types.Film

    embed__store_id: types.Store

    join__rental__inventory_id: types.Rental[]
  }

  language: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    language_id: number
    name: string
    last_update: string

    /**
     * join table
     */
    join__film__language_id: types.Film[]
  }

  nicer_but_slower_film_list: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    fid?: number
    title?: string
    description?: string
    category?: string
    price?: number
    length?: number
    rating?: "G" | "PG" | "PG-13" | "R" | "NC-17"
    actors?: string
  }

  payment: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    payment_id: number
    /**
     * Note:
     * This is a Foreign Key to `customer.customer_id`.<fk table='customer' column='customer_id'/>
     */
    customer_id: number
    /**
     * Note:
     * This is a Foreign Key to `staff.staff_id`.<fk table='staff' column='staff_id'/>
     */
    staff_id: number
    /**
     * Note:
     * This is a Foreign Key to `rental.rental_id`.<fk table='rental' column='rental_id'/>
     */
    rental_id: number
    amount: number
    payment_date: string

    /**
     * join table
     */
    embed__customer_id: types.Customer

    embed__rental_id: types.Rental

    embed__staff_id: types.Staff
  }

  rental: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    rental_id: number
    rental_date: string
    /**
     * Note:
     * This is a Foreign Key to `inventory.inventory_id`.<fk table='inventory' column='inventory_id'/>
     */
    inventory_id: number
    /**
     * Note:
     * This is a Foreign Key to `customer.customer_id`.<fk table='customer' column='customer_id'/>
     */
    customer_id: number
    return_date?: string
    /**
     * Note:
     * This is a Foreign Key to `staff.staff_id`.<fk table='staff' column='staff_id'/>
     */
    staff_id: number
    last_update: string

    /**
     * join table
     */
    embed__customer_id: types.Customer

    embed__inventory_id: types.Inventory

    embed__staff_id: types.Staff

    join__payment__rental_id: types.Payment[]
  }

  sales_by_film_category: {
    category?: string
    total_sales?: number
  }

  sales_by_store: {
    store?: string
    manager?: string
    total_sales?: number
  }

  staff: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    staff_id: number
    first_name: string
    last_name: string
    /**
     * Note:
     * This is a Foreign Key to `address.address_id`.<fk table='address' column='address_id'/>
     */
    address_id: number
    email?: string
    store_id: number
    active: boolean
    username: string
    password?: string
    last_update: string
    picture?: string

    /**
     * join table
     */
    embed__address_id: types.Address

    join__payment__staff_id: types.Payment[]

    join__rental__staff_id: types.Rental[]

    join__store__manager_staff_id: types.Store[]

    joinby__store: types.Address[]
  }

  staff_list: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id?: number
    name?: string
    address?: string
    "zip code"?: string
    phone?: string
    city?: string
    country?: string
    sid?: number
  }

  store: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    store_id: number
    /**
     * Note:
     * This is a Foreign Key to `staff.staff_id`.<fk table='staff' column='staff_id'/>
     */
    manager_staff_id: number
    /**
     * Note:
     * This is a Foreign Key to `address.address_id`.<fk table='address' column='address_id'/>
     */
    address_id: number
    last_update: string

    /**
     * join table
     */
    embed__address_id: types.Address

    embed__manager_staff_id: types.Staff

    join__inventory__store_id: types.Inventory[]

    joinby__inventory: types.Film[]
  }
}
