<?php

include_once('conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);


//LISTAGEM DOS USUARIOS E PESQUISA PELO NOME E EMAIL

if($postjson['requisicao'] == 'listar'){


    if($postjson['textoBuscar'] == ''){
      $query = mysqli_query($mysqli, "select * from users order by id desc limit $postjson[start], $postjson[limit]");
    }else{
      $busca = $postjson['textoBuscar'] . '%';
      $query = mysqli_query($mysqli, "select * from users where name LIKE '$busca' or email LIKE '$busca' order by id desc limit $postjson[start], $postjson[limit]");
    }



 	while($row = mysqli_fetch_array($query)){
 		$dados[] = array(
 			'id' => $row['id'],
 			'name' => $row['name'],
			'email' => $row['email'],
            'password' => $row['password'],


 		);

 }

        if($query){
                $result = json_encode(array('success'=>true, 'result'=>$dados));

            }else{
                $result = json_encode(array('success'=>false));

            }
            echo $result;


}else if($postjson['requisicao'] == 'adicionar'){

       $query = mysqli_query($mysqli, "INSERT INTO users SET name = '$postjson[name]', email = '$postjson[email]', password = '$postjson[password]' ");

     $id = mysqli_insert_id($mysqli);


    if($query){
    $result = json_encode(array('success'=>true, 'id'=>$id));

  }else{
    $result = json_encode(array('success'=>false));

  }
   echo $result;


}else if($postjson['requisicao'] == 'editar'){

       $query = mysqli_query($mysqli, "UPDATE users SET name = '$postjson[name]', email = '$postjson[email]', password = '$postjson[password]' where id = '$postjson[id]' ");

     $id = mysqli_insert_id($mysqli);


    if($query){
    $result = json_encode(array('success'=>true, 'id'=>$id));

  }else{
    $result = json_encode(array('success'=>false));

  }
   echo $result;

  }else if($postjson['requisicao'] == 'excluir'){

       $query = mysqli_query($mysqli, "delete from users where id = '$postjson[id]' ");

     $id = mysqli_insert_id($mysqli);


    if($query){
    $result = json_encode(array('success'=>true, 'id'=>$id));

  }else{
    $result = json_encode(array('success'=>false));

  }
   echo $result;

   }else if($postjson['requisicao'] == 'login'){

    $query = mysqli_query($mysqli, "SELECT * from users where email = '$postjson[email]' and password = '$postjson[password]' ");

  $result = mysqli_num_rows($query);



 if($result > 0){
 $result = json_encode(array('success'=>true));

}else{
 $result = json_encode(array('success'=>false));

}
echo $result;

   }





