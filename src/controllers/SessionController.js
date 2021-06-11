/*

* Métodos
* Index:  Listagem de sessoes
* store: Criar uma sessão
* Show: quando queremos listar uma única sessão
* update: Aterar alguma sessão
* destroy: Quando queremos deletar uma sessão

*/

import User from "../models/User";
import * as Yup from "yup";

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response
        .status(400)
        .json({ error: "Falha na validação, envie um e-mail válido." });
    }
    const { email } = request.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return response.json(user);
  }
}

export default new SessionController();
