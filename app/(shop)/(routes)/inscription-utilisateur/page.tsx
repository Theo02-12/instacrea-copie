import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"

const Register = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h3>Inscrivez-vous sur Instacréa !</h3>
            <form className="w-1/4">
                <div className="flex w-full">
                    <Input className="my-2 rounded me-1" placeholder="Nom" name="firstName" />
                    <Input className="my-2 rounded ms-1" placeholder="Prénom" name="lastName" />
                </div>
                <Input className="my-2 rounded" placeholder="Email" name="email" />
                <Input className="my-2 rounded" placeholder="Adresse" name="adress" />
                <div className="flex w-full">
                    <Input className="my-2 rounded me-1" placeholder="Code postal" name="postalCode" />
                    <Input className="my-2 rounded ms-1" placeholder="Ville" name="city" />
                </div>
                <Input className="my-2 rounded" type="password" placeholder="Mot de passe" name="password" />
                <Input className="my-2 rounded" type="password" placeholder="Vérifier votre mot de passe" name="passwordVerif" />
                <Button className="bg-black w-full text-white rounded mx-auto">Inscription</Button>
            </form>
        </div>
    )
}

export default Register