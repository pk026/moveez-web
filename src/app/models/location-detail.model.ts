
export class LocationDetail {
  constructor (
    public id = 0,
    public name = '',
    public lattitude = 0,
    public longitude = 0,
    public position = '',
    public pic_url = '',
    public street = '',
    public area = '',
    public land_mark = '',
    public city = '',
    public postal_code = '',
    public state = '',
    public country = '',
    public place_id = '',
   // public tags: string[],
    public about = '',
    public g_type: string[] = [],
    public rating: number = 0,
    public reviews: number = 0,
    public been_here: string = '',
    public baap_destination: string = '',
  ) {}
}
