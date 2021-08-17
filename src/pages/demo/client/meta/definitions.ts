import * as types from './types'

export interface definitions {
  _column: {
    table_description?: string;
    description?: string;
    table_catalog?: string;
    table_schema?: string;
    table_name?: string;
    column_name?: string;
    ordinal_position?: number;
    column_default?: string;
    is_nullable?: string;
    data_type?: string;
  
    
  };
  
  _foreign_key: {
    table_schema?: string;
    constraint_name?: string;
    table_name?: string;
    column_name?: string;
    foreign_table_schema?: string;
    foreign_table_name?: string;
    foreign_column_name?: string;
  
    
  };
  
  _primary_key: {
    table_schema?: string;
    table_name?: string;
    constraint_name?: string;
    ordinal_position?: number;
    column_name?: string;
  
    
  };
  
  /** 活动 */
  activity: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    title?: string;
    decs?: string;
    state?: string;
    created_at?: string;
    updated_at?: string;
  
    
  };
  
  actor: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** 用户名 */
    name: string;
    /** 邮箱 */
    email: string;
  
    /**
    * join table
    */
    'join__todo_actor__actor_id': types.TodoActor[];

		'join__todo__creator': types.Todo[];

		'joinby__todo_actor': types.Todo[];
  };
  
  issue: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    number?: number;
    title?: string;
    labels?: string;
    state?: string;
    locked?: boolean;
    comments?: number;
    created_at?: string;
    updated_at?: string;
    closed_at?: string;
    author_association?: string;
    user?: string;
    avatar?: string;
  
    
  };
  
  issue_label: {
    label?: string;
  
    
  };
  
  pg_stat_statements: {
    userid?: string;
    dbid?: string;
    queryid?: number;
    query?: string;
    calls?: number;
    total_time?: number;
    min_time?: number;
    max_time?: number;
    mean_time?: number;
    stddev_time?: number;
    rows?: number;
    shared_blks_hit?: number;
    shared_blks_read?: number;
    shared_blks_dirtied?: number;
    shared_blks_written?: number;
    local_blks_hit?: number;
    local_blks_read?: number;
    local_blks_dirtied?: number;
    local_blks_written?: number;
    temp_blks_read?: number;
    temp_blks_written?: number;
    blk_read_time?: number;
    blk_write_time?: number;
  
    
  };
  
  /** 任务 */
  todo: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** 是否完成 */
    done: boolean;
    /** 任务 */
    task: string;
    /** 到期时间 */
    due?: string;
    /** 标签 */
    labels?: string;
    /** 状态 */
    state?: "success" | "error" | "processing" | "warning" | "default";
    updated_at?: string;
    /**
     * 创建者
     *
     * Note:
     * This is a Foreign Key to `actor.id`.<fk table='actor' column='id'/>
     */
    creator?: number;
  
    /**
    * join table
    */
    'embed__creator': types.Actor;

		'join__todo_actor__todo_id': types.TodoActor[];

		'joinby__todo_actor': types.Actor[];
  };
  
  todo_actor: {
    /**
     * Note:
     * This is a Foreign Key to `todo.id`.<fk table='todo' column='id'/>
     */
    todo_id: number;
    /**
     * Note:
     * This is a Foreign Key to `actor.id`.<fk table='actor' column='id'/>
     */
    actor_id: number;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** 是否管理员 */
    is_manager?: boolean;
  
    /**
    * join table
    */
    'embed__todo_id': types.Todo;

		'embed__actor_id': types.Actor;
  };
  
  user: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    name?: string;
  
    
  };
  
}

