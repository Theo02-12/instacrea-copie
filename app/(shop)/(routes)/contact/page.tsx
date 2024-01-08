import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"

const Contact = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="my-4 font-bold text-[30px] before:content-['|'] before:font-bold before:px-2">Contactez-nous !</h1>
        <p>N&apos;hésitez pas à prendre contact avec nous.</p>
      </div>
      <div className="flex  flex-col items-center md:flex-row md:justify-center my-5 overflow-hidden">
        <iframe className="mx-8" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40595.34990616987!2d1.5643238854225818!3d50.5116710627796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ddd08512744ae3%3A0x40af13e8163d210!2sLe%20Touquet-Paris-Plage!5e0!3m2!1sfr!2sfr!4v1694077122516!5m2!1sfr!2sfr" width="500" height="300" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        <div className="border px-4 rounded my-4">
          <ul>
            <li className="py-3">Lundi - Samedi 8H - 17H</li>
            <li className="py-3">contact@instacrea.com <br />INSTACREA</li>
            <li className="py-3">Le Touquet-Paris-Plage 62520</li>
            <li className="py-3">France <br /> TEL ***********</li>
          </ul>
        </div>
      </div>
      <div className="p-3 md:w-2/5 md:mx-auto">
        <h3 className="text-center">Pour nous contacter : </h3>
        <form>
          <Input className="my-3 rounded" type="text" placeholder="Nom" name="nom" required/>
          <Input className="my-3 rounded" type="email" placeholder="Email" name="email" required/>
          <Textarea className="my-3 rounded" placeholder="Message" required/>
          <div className="flex items-start">
          <Input className="w-4 p-1" type="checkbox" id="rgpdContact" required/>
          <label htmlFor="rgpdContact" className="inline pt-2 ps-1 text-[12px]">
            Dans le but de ma demande personnelle via le formulaire, j&apos;accepte à ce que mes données soient utilisées afin de me recontacter. Vos informations ne seront en aucun cas conservées à des fins commerciales.
           <br /><br/> Pour en savoir plus sur vos droits, consultez notre Politique de protection des données personnelles
          </label>
          </div>
          <Button className="bg-[#000000] text-white w-full text-center rounded my-8 mx-auto hover:bg-black hover:text-[#f69f2f]">Envoyer</Button>
        </form>
      </div>
    </div>
  )
}

export default Contact