package com.tanyp.chapter.controller;

import com.tanyp.chapter.domain.LearnResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by tanyp on 2018/4/26
 */
@Controller
@RestController
public class IndexController {

    @RequestMapping("/")
    public ModelAndView index() {
        List<LearnResource> learnList = new ArrayList<>();
        learnList.addAll(Arrays.asList(new LearnResource("tanyp", "tanyp", "http://github.com/tanyp")));
        ModelAndView modelAndView = new ModelAndView("index");
        modelAndView.addObject("learnList", learnList);
        return modelAndView;
    }
}
