const all_houses = () => {
  h1 = {
    house: {
      color: "gray",
      bedrooms: 6,
      garage: false,
      who_lives: "Sherlock Holmes",
      address: "221 Baker St",
    },
  }
  const h2 = {
    house: {
      color: "red",
      bedrooms: 4,
      garage: false,
      who_lives: "Dr. Watson",
      address: "222 Baker St",
    },
  }
  const h3 = {
    house: {
      color: "white",
      bedrooms: 2,
      garage: true,
      who_lives: "Mrs. Hudson",
      address: "223 Baker St",
    },
  }
  return [h1, h2, h3]
}
const who_lives_at_221_baker_st = () => {
  const all_houses_arr = all_houses()
  return all_houses_arr[0].house.who_lives
}
const how_many_bedrooms_dr_watson = () => {
  const all_houses_arr = all_houses()
  return all_houses_arr[1].house.bedrooms
}
const color_of_mrs_hudson_house = () => {
  const all_houses_arr = all_houses()
  return all_houses_arr[2].house.color
}
