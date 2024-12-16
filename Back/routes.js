import { Router } from "express"
import { clienteCreate, clienteIndex } from "./controllers/clienteController.js"
import { agendaCreate, agendaDestroy, agendaEdit, agendaIndex, agendaSearch, agendaShow, getDatasBloqueadas } from "./controllers/agendaController.js"

const router = Router()

router.get('/clientes', clienteIndex)
      .post('/clientes', clienteCreate)

router.get('/agendados', agendaIndex)
      .get('/datas-bloqueadas', getDatasBloqueadas)
      .post('/agendar', agendaCreate)
      .get('/agendado/:id', agendaShow)
      .delete('/agendado_delete/:id', agendaDestroy)
      .get('/agendado_buscar/:nome', agendaSearch)
      .put('/agendado_editar/:id', agendaEdit)
      
export default router