import Image from "next/image";

export default function BeerDetail({ bottle }) {
  const { id, name, image_url, tagline, 
    first_brewed, description, abv, ibu, target_fg, 
    target_og, ebc, srm, ph, attenuation_level, boil_volume, volume, 
    method, ingredients, food_pairing, brewers_tips, 
    contributed_by } = bottle;

  return (
    <div key={id} href={`../bootle/${id}`}
      className="min-h-screen p-6 md:grid grid-cols-2 gap-10 items-start">

      <div className={`flex justify-center
                        md:sticky top-28 mb-10 p-10
                      bg-white drop-shadow-lg rounded-xl overflow-hidden`}>
        <Image
          src={image_url}
          alt={tagline}
          className="max-h-[500px] h-auto"
          width={455}
          height={330}
          priority
        />
      </div>

      <div className={`flex flex-col gap-4 sticky top-10`}>
        <h1 className={`font-semibold text-3xl`}>{name}</h1>

        <div className={`flex justify-between`}>
          <p className={`text-sm`}> Year: <span className={`text-gray_2`}>{first_brewed}</span></p>
          <p className={`text-sm`}>Rating: <span className={`text-gray_2`}>5</span></p>
        </div>

        <p className={`text-sm mb-3`}>{description}</p>

        <table className="w-full">
          <tbody>
            <tr>
              <td><b>Alcohol (By Volume)</b></td>
              <td>{abv}</td>
            </tr>
            <tr>
              <td><b>IBU - Bitterness</b></td>
              <td>{ibu}</td>
            </tr>
            <tr>
              <td><b>target_fg</b></td>
              <td>{target_fg}</td>
            </tr>
            <tr>
              <td><b>target_og</b></td>
              <td>{target_og}</td>
            </tr>
            <tr>
              <td><b>ebc</b></td>
              <td>{ebc}</td>
            </tr>
            <tr>
              <td><b>SRM - Color assessment</b></td>
              <td>{srm}</td>
            </tr>
            <tr>
              <td><b>Ph</b></td>
              <td>{ph}</td>
            </tr>
            <tr>
              <td><b>Attenuation Level</b></td>
              <td>{attenuation_level}</td>
            </tr>
            <tr>
              <td><b>Volume</b></td>
              <td>{volume.value} {volume.unit}</td>
            </tr>
            <tr>
              <td><b>Boil Volume</b></td>
              <td>{boil_volume.value} {boil_volume.unit}</td>
            </tr>
            <tr>
              <td><b>Method</b></td>
              <td>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td><b>Mash temp</b></td>
                      <td>{method.mash_temp[0].temp.value} {method.mash_temp[0].temp.unit}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><b>Duration:</b></td>
                      <td>{method.mash_temp[0].duration}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><b>Fermentation:</b></td>
                      <td>{method.fermentation.temp.value}{method.fermentation.temp.unit}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td><b>Twist:</b></td>
                      <td>{method.twist}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="font-bold text-lg">Ingredients</h2>
        <table className="w-full">
          <tbody>
            <tr>
              <td><b>Malt</b></td>
              <td>
                <table className="w-full">
                  <tbody>
                    {ingredients.malt.map((key, id) =>
                      <tr key={id}>
                        <td>{key.name}</td>
                        <td>{key.amount.value} {key.amount.unit}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td><b>Hops</b></td>
              <td>
                <table className="w-full">
                  <tbody>
                    {ingredients.hops.map((key, id) =>
                      <tr key={id}>
                        <td>{key.name}</td>
                        <td>{key.amount.value} {key.amount.unit}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td><b>Yeast</b></td>
              <td>{ingredients.yeast}</td>
            </tr>
          </tbody>
        </table>

        <h2 className="font-bold text-lg">Food</h2>
        <ul>
          {food_pairing.map((food, id) => <li key={id}>- {food}</li>)}
        </ul>

        <p>{brewers_tips}</p>
        <p className={`text-xs text-gray_2`}>{contributed_by}</p>
      </div>
    </div>
  )
}
