export interface Credits {
  id:   number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult:                boolean;
  gender:               number;
  id:                   number;
  known_for_department: KnownForDepartment;
  name:                 string;
  original_name:        string;
  popularity:           number;
  profile_path:         null;
  cast_id?:             number;
  character?:           string;
  credit_id:            string;
  order?:               number;
  department?:          string;
  job?:                 string;
}

export enum KnownForDepartment {
  Acting = "Acting",
}
