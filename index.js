const express= require ('express');

const server = express();

server.use(express.json());

const users =[{id:1, name: 'John', age:33},{id:2, name: 'Maria', age:33}];

server.get('/', function(req, res) {
    return res.send("HEllo");
});
//obtener todos los usuarios
server.get('/user', function(req, res) {
    return res.status(200).json(users);
});
// obtener un usuario por su Id
server.get('/user/:id', function(req, res) {
    const params = req.params;
    const id= Number(params.id);

    const finderUser = users.find((user)=>{
       return user.id === id;
    }); 
    console.log(finderUser);

    if (finderUser === undefined) {
        return res.status(404).json('El usuario no existe');
    }
    return res.status(200).json(finderUser);
});

// Crear un usuario
server.post('/user', function(req, res) {
    const body=req.body;
    const {name,age}=body;
    console.log(name, age);
    const newUser={id:users.length+1, name:name, age:age};
    users.push(newUser);
    return res.status(201).json(newUser);
})


server.listen(3000,()=>console.log('listening on port 3000'));