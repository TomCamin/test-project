<?php

namespace Arcamy\HomeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $vegetals = $this->getDoctrine()
                           ->getEntityManager()
                           ->getRepository('HomeBundle:Vegetal')
                           ->getAllVegetals();
        return $this->render('HomeBundle:Default:tom.html.twig',array('vegetals'=> $vegetals));
    }
}
